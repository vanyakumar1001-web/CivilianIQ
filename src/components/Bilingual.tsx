'use client';

import type { ElementType } from 'react';
import { useLanguage, useT } from '@/lib/LanguageContext';

interface BiBlockProps {
  id: string;
  className?: string;
  translatedClassName?: string;
  as?: ElementType;
}

// Stacked bilingual text — English on top, the chosen language beneath. Devanagari
// (and other non-Latin scripts) need to run *larger* and at full contrast to read
// as easily as Latin text at the same visual weight, so the second line is never
// shrunk or dimmed relative to English. When English itself is the chosen language,
// there's nothing to pair it with, so the second line is skipped entirely.
export function BiBlock({ id, className = '', translatedClassName = '', as: As = 'div' }: BiBlockProps) {
  const t = useT();
  const { languageOption } = useLanguage();
  const { en, translated } = t(id);
  const isEnglish = !languageOption || languageOption.code === 'en';
  return (
    <As className={className}>
      {en}
      {!isEnglish && (
        <span
          lang={languageOption.code}
          dir={languageOption.dir}
          className={`block ${languageOption.fontClass || ''} font-medium text-[1.05em] leading-relaxed text-ink mt-1 ${translatedClassName}`}
        >
          {translated}
        </span>
      )}
    </As>
  );
}

interface BiInlineProps {
  id: string;
  className?: string;
}

// Inline bilingual text — English · [language] on the same line, for buttons and short labels.
export function BiInline({ id, className = '' }: BiInlineProps) {
  const t = useT();
  const { languageOption } = useLanguage();
  const { en, translated } = t(id);
  const isEnglish = !languageOption || languageOption.code === 'en';
  return (
    <span className={className}>
      {en}
      {!isEnglish && (
        <span
          lang={languageOption.code}
          dir={languageOption.dir}
          className={`${languageOption.fontClass || ''} font-medium text-[1em]`}
        >
          {' '}
          · {translated}
        </span>
      )}
    </span>
  );
}
