import { useTranslations } from 'next-intl';
import { SiteShell } from './SiteShell';

/** Temporary content for Privacy / Terms pages until the real legal text exists. */
export function LegalPlaceholder({ page }: { page: 'privacyTitle' | 'termsTitle' }) {
  const t = useTranslations('legal');

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h1 className="font-display text-3xl font-bold text-brand-ink">{t(page)}</h1>
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100">{t('draft')}</p>
      </div>
    </SiteShell>
  );
}
