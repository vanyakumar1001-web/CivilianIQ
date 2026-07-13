'use client';

import { useState, type FormEvent } from 'react';
import RightsCard from '@/components/RightsCard';
import Glossary from '@/components/Glossary';
import CountryGate from '@/components/CountryGate';
import { BiBlock, BiInline } from '@/components/Bilingual';
import { useLanguage, useT } from '@/lib/LanguageContext';
import type { ClassifyResponse, MatchedRightsEntry, GlossaryTerm, ApiError } from '@/types';

const EXAMPLES: Record<'IN' | 'US', string[]> = {
  IN: [
    'cop stopped me wants my phone',
    'police ne roka hai phone maang raha hai',
    'police wont file my FIR',
    'they want to search my house without warrant',
  ],
  US: [
    'cop pulled me over for speeding',
    'police want to search my car',
    'ICE stopped me and wants my papers',
    'police arrested me and wont tell me why',
  ],
};

export default function HomePage() {
  const { ready, preference, countryOption, languageOption, clearPreference } = useLanguage();
  const t = useT();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MatchedRightsEntry[] | null>(null);
  const [glossary, setGlossary] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim() || !preference) return;
    setLoading(true);
    setError('');
    setResults(null);
    setGlossary([]);
    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, country: preference.country, language: preference.language }),
      });
      const data: ClassifyResponse & Partial<ApiError> = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setResults(data.results);
      setGlossary(data.glossary || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (!ready) return null;
  if (!preference || !countryOption || !languageOption) return <CountryGate />;

  const examples = EXAMPLES[preference.country] ?? EXAMPLES.IN;
  const noResultsKey = preference.country === 'US' ? 'noResults_US' : 'noResults_IN';

  return (
    <main className="min-h-screen text-ink px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-butter via-peach to-blush bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(244,169,122,0.25)] animate-glow">
            CivilianIQ
          </h1>
          <button
            onClick={clearPreference}
            className="text-xs rounded-full border border-peach/40 bg-brown-light/60 px-3 py-1 text-ink-light hover:border-blush-deep transition-colors"
            title="Change country / language"
          >
            {countryOption.flag} {languageOption.nativeLabel}
          </button>
        </div>
        <BiBlock as="p" className="text-ink-light mb-1" id="tagline" />
        <p className="text-sm text-ink-faint mb-6 italic">
          <BiBlock id="reassurance" as="span" translatedClassName="not-italic" />
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${t('searchPlaceholder').en} / ${t('searchPlaceholder').translated}`}
            className="flex-1 rounded-2xl bg-brown-light/70 backdrop-blur-sm border border-peach/40 shadow-soft px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-blush-deep transition-shadow"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-accent text-brown font-semibold px-5 py-3 text-sm shadow-soft hover:bg-accent-deep hover:shadow-lift transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? <BiInline id="searching" /> : <BiInline id="search" />}
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setQuery(ex)}
              className="text-xs rounded-full border border-peach/40 bg-brown-light/60 px-3 py-1 text-ink-light hover:border-blush-deep hover:text-ink hover:-translate-y-0.5 transition-all active:scale-95"
            >
              {ex}
            </button>
          ))}
        </div>

        {error && <p className="text-rose-300 text-sm mb-4">{error}</p>}

        {results && results.length === 0 && (
          <BiBlock as="p" className="text-sm text-ink-light" id={noResultsKey} />
        )}

        <div className="space-y-4">
          {results?.map((entry, i) => (
            <div key={entry.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <RightsCard entry={entry} />
            </div>
          ))}
        </div>

        {glossary.length > 0 && (
          <div className="mt-4">
            <Glossary terms={glossary} />
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="/record"
            className="inline-block rounded-full bg-blush-deep text-brown font-semibold px-8 py-4 text-base shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <BiInline id="goToRecord" />
          </a>
        </div>
      </div>
    </main>
  );
}
