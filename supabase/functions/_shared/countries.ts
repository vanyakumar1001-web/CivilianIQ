import { entries as indiaEntries } from './data/india.ts';
import { entries as usaEntries } from './data/usa.ts';
import { entries as chinaEntries } from './data/china.ts';
import { entries as russiaEntries } from './data/russia.ts';
import { entries as brazilEntries } from './data/brazil.ts';
import { entries as ukEntries } from './data/uk.ts';

export type CountryCode = 'IN' | 'US' | 'CN' | 'RU' | 'BR' | 'GB';
export type LanguageCode = 'en' | 'hi' | 'es' | 'fr' | 'zh' | 'ru' | 'pt';

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'Hindi',
  es: 'Spanish',
  fr: 'French',
  zh: 'Mandarin Chinese',
  ru: 'Russian',
  pt: 'Portuguese',
};

export function entriesForCountry(country: CountryCode) {
  if (country === 'US') return usaEntries;
  if (country === 'CN') return chinaEntries;
  if (country === 'RU') return russiaEntries;
  if (country === 'BR') return brazilEntries;
  if (country === 'GB') return ukEntries;
  return indiaEntries;
}

export function countryName(country: CountryCode): string {
  if (country === 'US') return 'the United States';
  if (country === 'CN') return 'China';
  if (country === 'RU') return 'Russia';
  if (country === 'BR') return 'Brazil';
  if (country === 'GB') return 'the United Kingdom';
  return 'India';
}
