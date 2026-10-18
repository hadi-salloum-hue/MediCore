'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';

// Appears after scrolling this many pixels. Set to 0 to show it always.
const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const t = useTranslations('common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function goToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Keep keyboard focus somewhere sensible: the button disappears once we reach the top.
    document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  if (!visible) return null;

  // Placed at the physical bottom-left corner in both languages (as requested).
  return (
    <button
      type="button"
      onClick={goToTop}
      aria-label={t('backToTop')}
      className="fixed bottom-4 left-4 z-40 grid animate-pop-in h-11 w-11 place-items-center rounded-full bg-brand-navy text-white shadow-pop transition-colors hover:bg-brand-navyLight sm:bottom-6 sm:left-6 dark:bg-brand-accent dark:text-brand-navy dark:hover:bg-brand-accentHover"
    >
      <ArrowUp aria-hidden className="h-5 w-5" />
    </button>
  );
}
