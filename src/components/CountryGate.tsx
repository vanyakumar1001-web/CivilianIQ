import { useState } from 'react';
import { COUNTRIES, useLanguage } from '@/lib/LanguageContext';
import type { CountryCode, CountryOption, LanguageCode } from '@/lib/i18n';

export default function CountryGate() {
  const { setPreference } = useLanguage();
  const [country, setCountry] = useState<CountryOption | null>(null);

  function pickCountry(c: CountryOption) {
    setCountry(c);
  }

  function pickLanguage(code: LanguageCode) {
    if (!country) return;
    setPreference({ country: country.code as CountryCode, language: code });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brown">
      <div className="w-full max-w-md rounded-2xl border border-peach/40 bg-brown-light/90 backdrop-blur-sm shadow-lift p-6 animate-fade-in-up">
        <h1 className="text-2xl font-bold mb-1 tracking-wide bg-gradient-to-r from-butter via-peach to-blush bg-clip-text text-transparent">
          CivilianIQ
        </h1>

        {!country ? (
          <>
            <p className="text-sm text-ink-light mb-6">Which country are you in?</p>
            <div className="grid grid-cols-1 gap-3">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => pickCountry(c)}
                  className="flex items-center gap-3 rounded-xl border border-peach/40 bg-brown-light/60 px-4 py-3 text-left text-ink hover:border-blush-deep hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="font-medium">{c.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setCountry(null)}
              className="text-xs text-accent hover:underline mb-4"
            >
              ← Back
            </button>
            <p className="text-sm text-ink-light mb-1">
              Choose your language for {country.flag} {country.label}
            </p>
            <p className="text-xs text-ink-faint mb-6">Every screen shows English alongside your choice.</p>
            <div className="grid grid-cols-1 gap-3">
              {country.languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => pickLanguage(l.code)}
                  className="rounded-xl border border-peach/40 bg-brown-light/60 px-4 py-3 text-left text-ink hover:border-blush-deep hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                  <span className="font-medium">
                    {l.label}
                    {l.nativeLabel !== l.label && (
                      <>
                        {' · '}
                        <span lang={l.code} dir={l.dir} className={l.fontClass || ''}>
                          {l.nativeLabel}
                        </span>
                      </>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
