import type { ElementType, ReactNode } from 'react';

interface BiBlockProps {
  en: ReactNode;
  hi: ReactNode;
  className?: string;
  hiClassName?: string;
  as?: ElementType;
}

// Stacked bilingual text — English on top, Hindi beneath. Devanagari needs to run
// *larger* and at full contrast to read as easily as Latin text at the same visual
// weight, so the Hindi line intentionally isn't shrunk or dimmed relative to English.
export function BiBlock({ en, hi, className = '', hiClassName = '', as: As = 'div' }: BiBlockProps) {
  return (
    <As className={className}>
      {en}
      <span
        lang="hi"
        className={`block font-devanagari font-medium text-[1.05em] leading-relaxed text-ink mt-1 ${hiClassName}`}
      >
        {hi}
      </span>
    </As>
  );
}

interface BiInlineProps {
  en: ReactNode;
  hi: ReactNode;
  className?: string;
}

// Inline bilingual text — English · Hindi on the same line, for buttons and short labels.
export function BiInline({ en, hi, className = '' }: BiInlineProps) {
  return (
    <span className={className}>
      {en}
      <span lang="hi" className="font-devanagari font-medium text-[1em]">
        {' '}
        · {hi}
      </span>
    </span>
  );
}
