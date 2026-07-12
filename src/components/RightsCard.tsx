'use client';

import { useState } from 'react';
import { BiInline } from '@/components/Bilingual';
import type { MatchedRightsEntry, Severity } from '@/types';

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: 'bg-rose-100 text-rose-700 border-rose-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  medium: 'bg-amber-100 text-amber-700 border-amber-300',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-300',
};

interface HiLineProps {
  text?: string;
  className?: string;
}

// Devanagari needs to run larger and at full contrast to read as easily as the
// Latin text beside it — never shrink or dim the Hindi line relative to English.
function HiLine({ text, className = 'text-ink' }: HiLineProps) {
  if (!text) return null;
  return (
    <span lang="hi" className={`block font-devanagari font-medium text-[1.05em] leading-relaxed mt-1 ${className}`}>
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

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(entry.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <div className="rounded-2xl border border-peach/40 bg-brown-light/70 backdrop-blur-sm shadow-soft p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:border-peach/70">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="font-semibold text-lg text-ink">
          {entry.situation_description}
          <HiLine text={entry.hi?.situation_description} />
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
        <HiLine text={entry.hi?.right_plain} />
      </p>
      <p className="text-xs text-ink-faint mb-4">{entry.right_formal}</p>

      <div className="rounded-xl bg-butter/90 border border-peach/40 p-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase tracking-wide text-brown/60">
            <BiInline en="What to say" hi="क्या कहें" />
          </span>
          <button
            onClick={copyScript}
            className="text-xs text-brown font-semibold hover:underline active:scale-95 transition-transform"
          >
            {copied ? <BiInline en="Copied!" hi="कॉपी हो गया!" /> : <BiInline en="Copy" hi="कॉपी करें" />}
          </button>
        </div>
        <p className="text-sm text-brown">
          {entry.script}
          <HiLine text={entry.hi?.script} className="text-brown" />
        </p>
      </div>

      <button
        onClick={() => setShowEscalation((s) => !s)}
        className="text-xs text-accent hover:underline mb-2"
      >
        {showEscalation ? (
          <BiInline en="Hide escalation steps" hi="आगे के कदम छुपाएं" />
        ) : (
          <BiInline en="If this doesn't work →" hi="अगर यह काम न करे →" />
        )}
      </button>

      {showEscalation && (
        <ol className="list-decimal list-inside text-sm text-ink space-y-3 mb-3 animate-fade-in-up">
          {entry.escalation.map((step, i) => (
            <li key={i}>
              {step}
              <HiLine text={entry.hi?.escalation?.[i]} className="text-ink ml-5" />
            </li>
          ))}
        </ol>
      )}

      <p className="text-xs text-rose-300/90 mb-2">
        <span className="font-semibold">
          <BiInline en="Do not:" hi="यह न करें:" />
        </span>{' '}
        {entry.what_not_to_do}
        <HiLine text={entry.hi?.what_not_to_do} />
      </p>

      <p className="text-[11px] text-ink-faint">{entry.source_statutes.join(' · ')}</p>
    </div>
  );
}
