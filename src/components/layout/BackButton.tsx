'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

function cameFromThisSite(): boolean {
  try {
    return document.referrer !== '' && new URL(document.referrer).origin === window.location.origin;
  } catch {
    return false;
  }
}

/** One step back, shown on every page except the home page. Icon only: the label is for screen readers. */
export function BackButton() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/') return null;

  function goBack() {
    // Opened in a new tab or from outside the site: there is nothing to go back to, so go home.
    if (cameFromThisSite() && window.history.length > 1) router.back();
    else router.push('/');
  }

  return (
    <div className="mx-auto max-w-6xl animate-menu-in px-4 pt-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={goBack}
        aria-label={t('back')}
        className="grid h-11 w-11 place-items-center rounded-full border border-brand-border bg-brand-surface text-brand-ink transition-all duration-200 hover:-translate-x-0.5 hover:border-brand-accent/60 hover:text-teal-700 active:scale-95 dark:hover:text-brand-teal rtl:hover:translate-x-0.5"
      >
        <ArrowLeft aria-hidden className="h-5 w-5 rtl:-scale-x-100" />
      </button>
    </div>
  );
}
