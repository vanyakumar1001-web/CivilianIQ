import { BiInline } from '@/components/Bilingual';

export default function Glossary({ terms }) {
  if (!terms || terms.length === 0) return null;

  return (
    <div className="rounded-2xl border border-blush bg-white/60 shadow-soft p-5 mb-4">
      <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-3">
        <BiInline en="Legal terms explained" hi="कानूनी शब्द आसान भाषा में" />
      </h2>
      <dl className="space-y-3">
        {terms.map((t) => (
          <div key={t.term}>
            <dt className="text-sm font-semibold text-ink">{t.term}</dt>
            <dd className="text-sm text-ink-light">
              {t.explanation_en}
              <span lang="hi" className="block font-devanagari text-[0.9em] mt-0.5">
                {t.explanation_hi}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
