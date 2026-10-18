'use client';

import { useTransition } from 'react';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

const OPTIONS: { locale: Locale; label: string; lang: string }[] = [
  { locale: 'en', label: 'EN', lang: 'en' },
  { locale: 'ar', label: 'العربية', lang: 'ar' }
];

export function LanguageSwitcher() {
  const t = useTranslations('nav');
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === current) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  }

  return (
    <div
      role="group"
      aria-label={t('languageLabel')}
      className={clsx(
        'inline-flex rounded-lg border border-brand-border bg-brand-surface p-0.5',
        isPending && 'opacity-70'
      )}
    >
      {OPTIONS.map((option) => {
        const active = option.locale === current;
        return (
          <button
            key={option.locale}
            type="button"
            lang={option.lang}
            aria-pressed={active}
            onClick={() => change(option.locale)}
            className={clsx(
              'h-9 min-w-[44px] rounded-md px-2.5 text-xs font-semibold transition-colors',
              active ? 'bg-brand-navy text-white dark:bg-brand-accent dark:text-brand-navy' : 'text-brand-muted hover:text-teal-700 dark:hover:text-brand-teal'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
