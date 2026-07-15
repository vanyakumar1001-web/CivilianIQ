'use client';

import { useState } from 'react';
import { BiInline } from '@/components/Bilingual';
import { useLanguage, useT } from '@/lib/LanguageContext';
import type { LanguageOption } from '@/lib/i18n';
import type { ApiError, MatchedRightsEntry, Severity } from '@/types';

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: 'bg-rose-100 text-rose-700 border-rose-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  medium: 'bg-amber-100 text-amber-700 border-amber-300',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-300',
};

interface TranslatedLineProps {
  text?: string;
  className?: string;
  languageOption: LanguageOption | null;
}

// Non-Latin scripts (like Devanagari) need to run larger and at full contrast to
// read as easily as the Latin text beside them — never shrink or dim this line.
// When English itself is the chosen language, there's nothing to pair it with.
function TranslatedLine({ text, className = 'text-ink', languageOption }: TranslatedLineProps) {
  if (!text || !languageOption || languageOption.code === 'en') return null;
  return (
    <span
      lang={languageOption.code}
      dir={languageOption.dir}
      className={`block ${languageOption.fontClass || ''} font-medium text-[1.05em] leading-relaxed mt-1 ${className}`}
    >
      {text}
    </span>
  );
}

interface RightsCardProps {
  entry: MatchedRightsEntry;
}

export default function RightsCard({ entry }: RightsCardProps) {
  const [copied, setCopied] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [translatedEscalation, setTranslatedEscalation] = useState<string[] | null>(
    entry.translated?.escalation ?? null
  );
  const [loadingEscalation, setLoadingEscalation] = useState(false);
  const { preference, languageOption } = useLanguage();
  const t = useT();

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(entry.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  async function toggleEscalation() {
    const opening = !showEscalation;
    setShowEscalation(opening);
    if (!opening || translatedEscalation || loadingEscalation) return;
    if (!preference || !languageOption || languageOption.code === 'en') return;

    setLoadingEscalation(true);
    try {
      const res = await fetch('/api/translate-escalation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId: entry.id, country: preference.country, language: preference.language }),
      });
      const data: { escalation: string[] } & Partial<ApiError> = await res.json();
      if (res.ok) setTranslatedEscalation(data.escalation);
    } catch {
      // leave escalation English-only on failure — the steps themselves still show
    } finally {
      setLoadingEscalation(false);
    }
  }

  return (
    <div className="rounded-2xl border border-peach/40 bg-brown-light/70 backdrop-blur-sm shadow-soft p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:border-peach/70">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="font-semibold text-lg text-ink">
          {entry.situation_description}
          <TranslatedLine text={entry.translated?.situation_description} languageOption={languageOption} />
        </h2>
        <span
          className={`shrink-0 text-xs rounded-full border px-2 py-0.5 ${
            SEVERITY_COLORS[entry.severity] || SEVERITY_COLORS.medium
          }`}
        >
          {entry.severity}
        </span>
      </div>

      {entry.match_reason && (
        <p className="text-xs text-ink-faint mb-3">{entry.match_reason}</p>
      )}

      <p className="text-sm text-ink mb-3">
        {entry.right_plain}
        <TranslatedLine text={entry.translated?.right_plain} languageOption={languageOption} />
      </p>
      <p className="text-xs text-ink-faint mb-4">{entry.right_formal}</p>

      <div className="rounded-xl bg-butter/90 border border-peach/40 p-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase tracking-wide text-brown/60">
            <BiInline id="whatToSay" />
          </span>
          <button
            onClick={copyScript}
            className="text-xs text-brown font-semibold hover:underline active:scale-95 transition-transform"
          >
            {copied ? <BiInline id="copied" /> : <BiInline id="copy" />}
          </button>
        </div>
        <p className="text-sm text-brown">
          {entry.script}
          <TranslatedLine text={entry.translated?.script} className="text-brown" languageOption={languageOption} />
        </p>
      </div>

      <button onClick={toggleEscalation} className="text-xs text-accent hover:underline mb-2">
        {showEscalation ? <BiInline id="hideEscalation" /> : <BiInline id="ifNotWorking" />}
      </button>

      {showEscalation && (
        <ol className="list-decimal list-inside text-sm text-ink space-y-3 mb-3 animate-fade-in-up">
          {entry.escalation.map((step, i) => (
            <li key={i}>
              {step}
              <TranslatedLine text={translatedEscalation?.[i]} className="text-ink ml-5" languageOption={languageOption} />
            </li>
          ))}
          {loadingEscalation && <li className="list-none text-xs text-ink-faint italic">{t('translatingSteps').en}</li>}
        </ol>
      )}

      <p className="text-xs text-rose-300/90 mb-2">
        <span className="font-semibold">
          <BiInline id="doNot" />
        </span>{' '}
        {entry.what_not_to_do}
        <TranslatedLine text={entry.translated?.what_not_to_do} languageOption={languageOption} />
      </p>

      <p className="text-[11px] text-ink-faint">{entry.source_statutes.join(' · ')}</p>
    </div>
  );
}
