import { NextResponse } from 'next/server';
import { getAnthropicClient } from '@/lib/anthropic';
import { entries } from '@/data/srt-india';

export async function POST(request) {
  const { query } = await request.json();

  if (!query || typeof query !== 'string' || !query.trim()) {
    return NextResponse.json({ error: 'query is required' }, { status: 400 });
  }

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
        "You match a citizen's description of a police encounter in India (written in English, Hindi, or Hinglish) to the most relevant entries in a legal rights taxonomy. Only return entries that are genuinely relevant to what the citizen described, ranked best match first. If nothing is relevant, return an empty list. For every match, also translate the entry's situation, right_plain, script, escalation steps, and what_not_to_do into calm, natural, everyday Hindi (Devanagari script) — simple and reassuring, suitable for someone in a stressful moment. Translate faithfully; do not add or omit information. Finally, scan the text of the matched entries for legal or procedural jargon a layperson wouldn't know (e.g. bail, FIR, remand, anticipatory bail, warrant, writ, detention, NHRC, arrest memo) and explain each one in one or two very simple sentences, in both English and Hindi, as if explaining to a worried friend with no legal background. Skip this if no matches are found.",
      messages: [
        {
          role: 'user',
          content: `Situation described by the citizen: "${query}"\n\nTaxonomy entries:\n${JSON.stringify(
            catalog
          )}\n\nPick up to 3 of the most relevant entry ids, provide Hindi translations for each, and build a plain-language glossary of any legal jargon in the matched text.`,
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
                    hi: {
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
                  required: ['id', 'reason', 'hi'],
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
                    explanation_hi: { type: 'string' },
                  },
                  required: ['term', 'explanation_en', 'explanation_hi'],
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
  let parsed;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch (err) {
    console.error('classify: JSON parse failed', err, textBlock?.text);
    return NextResponse.json({ error: 'Could not parse classification result' }, { status: 502 });
  }

  const results = parsed.matches
    .map((m) => {
      const entry = entries.find((e) => e.id === m.id);
      return entry ? { ...entry, match_reason: m.reason, hi: m.hi } : null;
    })
    .filter(Boolean);

  return NextResponse.json({ results, glossary: parsed.glossary || [] });
}
