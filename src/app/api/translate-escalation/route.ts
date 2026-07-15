import { NextRequest, NextResponse } from 'next/server';
import { getAnthropicClient } from '@/lib/anthropic';
import { entries as indiaEntries } from '@/data/srt-india';
import { entries as usaEntries } from '@/data/srt-usa';
import { entries as chinaEntries } from '@/data/srt-china';
import { entries as russiaEntries } from '@/data/srt-russia';
import { entries as brazilEntries } from '@/data/srt-brazil';
import { entries as ukEntries } from '@/data/srt-uk';
import { LANGUAGE_NAMES, type CountryCode, type LanguageCode } from '@/lib/i18n';
import type { RightsEntry } from '@/types';

function entriesForCountry(country: CountryCode): RightsEntry[] {
  if (country === 'US') return usaEntries;
  if (country === 'CN') return chinaEntries;
  if (country === 'RU') return russiaEntries;
  if (country === 'BR') return brazilEntries;
  if (country === 'GB') return ukEntries;
  return indiaEntries;
}

// Translates a single entry's escalation steps on demand — split out from
// /api/classify because escalation is hidden by default in the UI, and eagerly
// translating it on every search was the largest chunk of unnecessary output.
export async function POST(request: NextRequest) {
  const {
    entryId,
    country = 'IN',
    language,
  }: { entryId?: string; country?: CountryCode; language?: LanguageCode } = await request.json();

  if (!entryId || typeof entryId !== 'string') {
    return NextResponse.json({ error: 'entryId is required' }, { status: 400 });
  }

  const entry = entriesForCountry(country).find((e) => e.id === entryId);
  if (!entry) {
    return NextResponse.json({ error: 'Unknown entry' }, { status: 404 });
  }

  const languageName = language ? LANGUAGE_NAMES[language] : 'Hindi';

  const client = getAnthropicClient();

  let response;
  try {
    response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      thinking: { type: 'disabled' },
      system: `Translate each escalation step faithfully into calm, natural, everyday ${languageName} — simple and reassuring, suitable for someone in a stressful moment. Do not add or omit information. Return exactly one translated string per input step, in the same order.`,
      messages: [
        {
          role: 'user',
          content: `Steps:\n${JSON.stringify(entry.escalation)}`,
        },
      ],
      output_config: {
        effort: 'low',
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              escalation: { type: 'array', items: { type: 'string' } },
            },
            required: ['escalation'],
            additionalProperties: false,
          },
        },
      },
    });
  } catch (err) {
    console.error('translate-escalation: Anthropic API error', err);
    return NextResponse.json({ error: 'Translation service unavailable' }, { status: 502 });
  }

  if (response.stop_reason === 'max_tokens') {
    console.error('translate-escalation: response truncated at max_tokens');
    return NextResponse.json({ error: 'Response too long' }, { status: 502 });
  }

  const textBlock = response.content.find((b) => b.type === 'text');
  let parsed: { escalation: string[] };
  try {
    parsed = JSON.parse(textBlock!.text);
  } catch (err) {
    console.error(
      'translate-escalation: JSON parse failed',
      err,
      textBlock && 'text' in textBlock ? textBlock.text : undefined
    );
    return NextResponse.json({ error: 'Could not parse translation result' }, { status: 502 });
  }

  return NextResponse.json({ escalation: parsed.escalation });
}
