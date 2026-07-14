import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  COUNTRIES,
  getCountry,
  getLanguage,
  translate,
  type CountryCode,
  type LanguageCode,
  type CountryOption,
  type LanguageOption,
} from '@/lib/i18n';

export interface LanguagePreference {
  country: CountryCode;
  language: LanguageCode;
}

interface LanguageContextValue {
  ready: boolean;
  preference: LanguagePreference | null;
  countryOption: CountryOption | null;
  languageOption: LanguageOption | null;
  setPreference: (pref: LanguagePreference) => void;
  clearPreference: () => void;
}

const STORAGE_KEY = 'civilianiq_preference';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preference, setPreferenceState] = useState<LanguagePreference | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.country && parsed?.language) setPreferenceState(parsed);
      }
    } catch {
      // ignore malformed/unavailable storage
    }
    setReady(true);
  }, []);

  function setPreference(pref: LanguagePreference) {
    setPreferenceState(pref);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
    } catch {
      // ignore
    }
  }

  function clearPreference() {
    setPreferenceState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  const countryOption = preference ? getCountry(preference.country) || null : null;
  const languageOption = preference ? getLanguage(preference.country, preference.language) || null : null;

  return (
    <LanguageContext.Provider value={{ ready, preference, countryOption, languageOption, setPreference, clearPreference }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function useT() {
  const { languageOption } = useLanguage();
  return (key: string) => translate(key, languageOption?.code ?? null);
}

export { COUNTRIES };
