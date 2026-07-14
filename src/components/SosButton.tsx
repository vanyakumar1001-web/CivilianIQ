'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage, useT } from '@/lib/LanguageContext';
import { EMERGENCY_NUMBERS } from '@/lib/i18n';

const CONFIRM_WINDOW_MS = 4000;

// Calling a real emergency line by accident wastes dispatch resources, so the
// first tap only arms the button; a second tap within the window actually dials.
export default function SosButton() {
  const { preference, languageOption } = useLanguage();
  const t = useT();
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!preference) return null;
  const number = EMERGENCY_NUMBERS[preference.country];

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!confirming) {
      e.preventDefault();
      setConfirming(true);
      timerRef.current = setTimeout(() => setConfirming(false), CONFIRM_WINDOW_MS);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setConfirming(false);
  }

  const confirmText = t('sosConfirm');

  return (
    <a
      href={`tel:${number}`}
      onClick={handleClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold shadow-soft transition-all active:scale-95 ${
        confirming ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-500/90 text-white hover:bg-rose-500'
      }`}
    >
      {confirming ? (
        <>
          {confirmText.en.replace('{num}', number)}
          {languageOption && languageOption.code !== 'en' && (
            <span
              lang={languageOption.code}
              dir={languageOption.dir}
              className={`block ${languageOption.fontClass || ''} text-[0.85em] font-medium leading-tight mt-0.5`}
            >
              {confirmText.translated.replace('{num}', number)}
            </span>
          )}
        </>
      ) : (
        <>🆘 {t('sos').en}</>
      )}
    </a>
  );
}
