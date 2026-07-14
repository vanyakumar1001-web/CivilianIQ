import { corsHeaders } from '../_shared/cors.ts';
import { callClaude } from '../_shared/anthropic.ts';
import { entriesForCountry, LANGUAGE_NAMES, type CountryCode, type LanguageCode } from '../_shared/countries.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      query,
      country = 'IN',
      language,
    }: { query?: string; country?: CountryCode; language?: LanguageCode } = await req.json();

    if (!query || typeof query !== 'string' || !query.trim()) {
      return new Response(JSON.stringify({ error: 'query is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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

    const parsed = await callClaude({
      maxTokens: 8192,
      system: `You match a citizen's description of a police encounter (written in English or a mix of English and ${languageName}) to the most relevant entries in a legal rights taxonomy. Only return entries that are genuinely relevant to what the citizen described, ranked best match first. If nothing is relevant, return an empty list. For every match, also translate the entry's situation, right_plain, script, escalation steps, and what_not_to_do into calm, natural, everyday ${languageName} — simple and reassuring, suitable for someone in a stressful moment. Translate faithfully; do not add or omit information. Finally, scan the text of the matched entries for legal or procedural jargon a layperson wouldn't know and explain each one in one or two very simple sentences, in both English and ${languageName}, as if explaining to a worried friend with no legal background. Skip this if no matches are found.`,
      userContent: `Situation described by the citizen: "${query}"\n\nTaxonomy entries:\n${JSON.stringify(
        catalog
      )}\n\nPick up to 3 of the most relevant entry ids, provide ${languageName} translations for each, and build a plain-language glossary of any legal jargon in the matched text.`,
      schema: {
        type: 'object',
        properties: {
          matches: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                reason: { type: 'string', description: 'One short sentence on why this entry matches.' },
                translated: {
                  type: 'object',
                  properties: {
                    situation_description: { type: 'string' },
                    right_plain: { type: 'string' },
                    script: { type: 'string' },
                    escalation: { type: 'array', items: { type: 'string' } },
                    what_not_to_do: { type: 'string' },
                  },
                  required: ['situation_description', 'right_plain', 'script', 'escalation', 'what_not_to_do'],
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
    });

    const results = parsed.matches
      .map((m: { id: string; reason: string; translated: unknown }) => {
        const entry = entries.find((e) => e.id === m.id);
        return entry ? { ...entry, match_reason: m.reason, translated: m.translated } : null;
      })
      .filter((e: unknown) => e !== null);

    return new Response(JSON.stringify({ results, glossary: parsed.glossary || [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('classify: error', err);
    return new Response(JSON.stringify({ error: 'Classification service unavailable' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
