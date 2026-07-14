import { corsHeaders } from '../_shared/cors.ts';
import { callClaude } from '../_shared/anthropic.ts';
import { entriesForCountry, countryName, LANGUAGE_NAMES, type CountryCode, type LanguageCode } from '../_shared/countries.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      transcript,
      country = 'IN',
      language,
    }: { transcript?: string; country?: CountryCode; language?: LanguageCode } = await req.json();

    if (!transcript || typeof transcript !== 'string' || !transcript.trim()) {
      return new Response(JSON.stringify({ error: 'transcript is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const entries = entriesForCountry(country);
    const languageName = language ? LANGUAGE_NAMES[language] : 'Hindi';
    const country_name = countryName(country);

    const catalog = entries.map((e) => ({
      id: e.id,
      situation: e.situation_description,
      right_plain: e.right_plain,
      script: e.script,
    }));

    const parsed = await callClaude({
      maxTokens: 4096,
      system: `You are a real-time legal rights coach listening to a live, speaker-diarized transcript of a citizen-police encounter in ${country_name}. The transcript is pre-segmented by voice into turns labeled "Speaker 0", "Speaker 1", etc. — these speaker boundaries come from real audio diarization and are already correct; do not re-split or second-guess them. Based on what has been said so far, tell the citizen what right may apply right now and give them a short, calm sentence to say. Ground every suggestion strictly in the provided taxonomy — never invent a right, statute, or script. If nothing in the transcript clearly triggers a specific right yet, say triggered=false and give brief general guidance (stay calm, be polite, do not resist). Provide every piece of advice and every script in both English and calm, natural, everyday ${languageName}. Also scan the transcript and your own advice for legal or procedural jargon a layperson wouldn't know and explain each one in one or two very simple sentences, in both English and ${languageName}, as if explaining to a worried friend with no legal background. Return an empty glossary if no jargon appears. Finally, for every distinct "Speaker N" label that appears in the transcript, decide whether that speaker is the "officer" or the "citizen" based on what they say — the officer typically demands documents, gives orders, or asks accusatory questions; the citizen typically responds, asks about their rights, or asserts something. Return one entry per distinct speaker number seen.`,
      userContent: `Live transcript so far:\n"""\n${transcript}\n"""\n\nTaxonomy:\n${JSON.stringify(catalog)}`,
      schema: {
        type: 'object',
        properties: {
          triggered: { type: 'boolean' },
          matched_id: { anyOf: [{ type: 'string' }, { type: 'null' }] },
          advice_en: { type: 'string' },
          advice_translated: { type: 'string' },
          say_this_en: { anyOf: [{ type: 'string' }, { type: 'null' }] },
          say_this_translated: { anyOf: [{ type: 'string' }, { type: 'null' }] },
          glossary: {
            type: 'array',
            description: 'Plain-language explanations of legal jargon found in the transcript or advice.',
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
          speaker_labels: {
            type: 'array',
            description: 'One entry per distinct "Speaker N" seen in the transcript, mapping it to a role.',
            items: {
              type: 'object',
              properties: {
                speaker: { type: 'string', description: 'The speaker number as it appears in the transcript, e.g. "0".' },
                role: { type: 'string', enum: ['officer', 'citizen'] },
              },
              required: ['speaker', 'role'],
              additionalProperties: false,
            },
          },
        },
        required: [
          'triggered',
          'matched_id',
          'advice_en',
          'advice_translated',
          'say_this_en',
          'say_this_translated',
          'glossary',
          'speaker_labels',
        ],
        additionalProperties: false,
      },
    });

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('coach: error', err);
    return new Response(JSON.stringify({ error: 'Coaching service unavailable' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
