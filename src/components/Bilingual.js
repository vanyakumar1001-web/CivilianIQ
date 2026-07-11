// Stacked bilingual text — English on top, Hindi beneath in a softer, smaller line.
export function BiBlock({ en, hi, className = '', hiClassName = '', as: As = 'div' }) {
  return (
    <As className={className}>
      {en}
      <span lang="hi" className={`block font-devanagari text-[0.82em] text-ink-light mt-0.5 ${hiClassName}`}>
        {hi}
      </span>
    </As>
  );
}

// Inline bilingual text — English · Hindi on the same line, for buttons and short labels.
export function BiInline({ en, hi, className = '' }) {
  return (
    <span className={className}>
      {en}
      <span lang="hi" className="font-devanagari text-[0.9em] opacity-80">
        {' '}
        · {hi}
      </span>
    </span>
  );
}
