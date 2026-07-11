'use client';

import { useState } from 'react';
import { BiInline } from '@/components/Bilingual';

const SEVERITY_COLORS = {
  critical: 'bg-rose-100 text-rose-700 border-rose-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  medium: 'bg-amber-100 text-amber-700 border-amber-300',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-300',
};

function HiLine({ text, className = '' }) {
  if (!text) return null;
  return (
    <span lang="hi" className={`block font-devanagari text-[0.9em] text-ink-light mt-0.5 ${className}`}>
      {text}
    </span>
  );
}

export default function RightsCard({ entry }) {
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
    <div className="rounded-2xl border border-peach bg-white/60 shadow-soft p-5">
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

      <div className="rounded-xl bg-cream border border-peach p-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase tracking-wide text-ink-faint">
            <BiInline en="What to say" hi="क्या कहें" />
          </span>
          <button onClick={copyScript} className="text-xs text-accent hover:underline">
            {copied ? <BiInline en="Copied!" hi="कॉपी हो गया!" /> : <BiInline en="Copy" hi="कॉपी करें" />}
          </button>
        </div>
        <p className="text-sm text-ink">
          {entry.script}
          <HiLine text={entry.hi?.script} />
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
        <ol className="list-decimal list-inside text-sm text-ink space-y-2 mb-3">
          {entry.escalation.map((step, i) => (
            <li key={i}>
              {step}
              <HiLine text={entry.hi?.escalation?.[i]} className="ml-5" />
            </li>
          ))}
        </ol>
      )}

      <p className="text-xs text-rose-700/80 mb-2">
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
