import { BiInline } from '@/components/Bilingual';
import type { GlossaryTerm } from '@/types';

interface GlossaryProps {
  terms: GlossaryTerm[];
}

export default function Glossary({ terms }: GlossaryProps) {
  if (!terms || terms.length === 0) return null;

  return (
    <div className="rounded-2xl border border-blush/50 bg-brown-light/70 backdrop-blur-sm shadow-soft p-5 mb-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:border-blush/80 animate-fade-in-up">
      <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-3">
        <BiInline en="Legal terms explained" hi="कानूनी शब्द आसान भाषा में" />
      </h2>
      <dl className="space-y-4">
        {terms.map((t) => (
          <div key={t.term}>
            <dt className="text-sm font-semibold text-ink">{t.term}</dt>
            <dd className="text-sm text-ink-light">
              {t.explanation_en}
              <span lang="hi" className="block font-devanagari font-medium text-[1.05em] leading-relaxed text-ink mt-1">
                {t.explanation_hi}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
