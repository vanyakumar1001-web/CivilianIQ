import { NextRequest, NextResponse } from 'next/server';
import { getAnthropicClient } from '@/lib/anthropic';
import { entries as indiaEntries } from '@/data/srt-india';
import { entries as usaEntries } from '@/data/srt-usa';
import { entries as chinaEntries } from '@/data/srt-china';
import { entries as russiaEntries } from '@/data/srt-russia';
import { entries as brazilEntries } from '@/data/srt-brazil';
import { LANGUAGE_NAMES, type CountryCode, type LanguageCode } from '@/lib/i18n';
import type { ClassifyResponse, MatchedRightsEntry, Translation, GlossaryTerm, RightsEntry } from '@/types';

interface ClassifyMatch {
  id: string;
  reason: string;
  translated: Translation;
}

interface ClassifyModelOutput {
  matches: ClassifyMatch[];
  glossary: GlossaryTerm[];
}

function entriesForCountry(country: CountryCode): RightsEntry[] {
  if (country === 'US') return usaEntries;
  if (country === 'CN') return chinaEntries;
  if (country === 'RU') return russiaEntries;
  if (country === 'BR') return brazilEntries;
  return indiaEntries;
}

export async function POST(request: NextRequest) {
  const {
    query,
    country = 'IN',
    language,
  }: { query?: string; country?: CountryCode; language?: LanguageCode } = await request.json();

  if (!query || typeof query !== 'string' || !query.trim()) {
    return NextResponse.json({ error: 'query is required' }, { status: 400 });
  }

  const entries = entriesForCountry(country);
  const languageName = language ? LANGUAGE_NAMES[language] : 'Hindi';

  const catalog = entries.map((e) => ({
    id: e.id,
    category: e.category,
    sub_issue: e.sub_issue,
    situation: e.situation_description,
    keywords: e.trigger_keywords,
    right_plain: e.right_plain,
    script: e.script,
    escalation: e.escalation,
    what_not_to_do: e.what_not_to_do,
  }));

  const client = getAnthropicClient();

  let response;
  try {
    response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 8192,
      system:
        `You match a citizen's description of a police encounter (written in English or a mix of English and ${languageName}) to the most relevant entries in a legal rights taxonomy. Only return entries that are genuinely relevant to what the citizen described, ranked best match first. If nothing is relevant, return an empty list. For every match, also translate the entry's situation, right_plain, script, escalation steps, and what_not_to_do into calm, natural, everyday ${languageName} — simple and reassuring, suitable for someone in a stressful moment. Translate faithfully; do not add or omit information. Finally, scan the text of the matched entries for legal or procedural jargon a layperson wouldn't know and explain each one in one or two very simple sentences, in both English and ${languageName}, as if explaining to a worried friend with no legal background. Skip this if no matches are found.`,
      messages: [
        {
          role: 'user',
          content: `Situation described by the citizen: "${query}"\n\nTaxonomy entries:\n${JSON.stringify(
            catalog
          )}\n\nPick up to 3 of the most relevant entry ids, provide ${languageName} translations for each, and build a plain-language glossary of any legal jargon in the matched text.`,
        },
      ],
      output_config: {
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              matches: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    reason: {
                      type: 'string',
                      description: 'One short sentence on why this entry matches.',
                    },
                    translated: {
                      type: 'object',
                      properties: {
                        situation_description: { type: 'string' },
                        right_plain: { type: 'string' },
                        script: { type: 'string' },
                        escalation: { type: 'array', items: { type: 'string' } },
                        what_not_to_do: { type: 'string' },
                      },
                      required: [
                        'situation_description',
                        'right_plain',
                        'script',
                        'escalation',
                        'what_not_to_do',
                      ],
                      additionalProperties: false,
                    },
                  },
                  required: ['id', 'reason', 'translated'],
                  additionalProperties: false,
                },
              },
              glossary: {
                type: 'array',
                description: 'Plain-language explanations of legal jargon found in the matched entries.',
                items: {
                  type: 'object',
                  properties: {
                    term: { type: 'string' },
                    explanation_en: { type: 'string' },
                    explanation_translated: { type: 'string' },
                  },
                  required: ['term', 'explanation_en', 'explanation_translated'],
                  additionalProperties: false,
                },
              },
            },
            required: ['matches', 'glossary'],
            additionalProperties: false,
          },
        },
      },
    });
  } catch (err) {
    console.error('classify: Anthropic API error', err);
    return NextResponse.json({ error: 'Classification service unavailable' }, { status: 502 });
  }

  if (response.stop_reason === 'max_tokens') {
    console.error('classify: response truncated at max_tokens');
    return NextResponse.json({ error: 'Response too long, please try a shorter query' }, { status: 502 });
  }

  const textBlock = response.content.find((b) => b.type === 'text');
  let parsed: ClassifyModelOutput;
  try {
    parsed = JSON.parse(textBlock!.text);
  } catch (err) {
    console.error('classify: JSON parse failed', err, textBlock && 'text' in textBlock ? textBlock.text : undefined);
    return NextResponse.json({ error: 'Could not parse classification result' }, { status: 502 });
  }

  const results: MatchedRightsEntry[] = parsed.matches
    .map((m): MatchedRightsEntry | null => {
      const entry = entries.find((e) => e.id === m.id);
      return entry ? { ...entry, match_reason: m.reason, translated: m.translated } : null;
    })
    .filter((e): e is MatchedRightsEntry => e !== null);

  const body: ClassifyResponse = { results, glossary: parsed.glossary || [] };
  return NextResponse.json(body);
}
