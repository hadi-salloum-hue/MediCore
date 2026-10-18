import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations('footer');
  const year = String(new Date().getFullYear());

  return (
    <footer className="border-t border-brand-border bg-brand-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Logo className="h-7 w-auto" />
          <p className="text-xs text-brand-muted">
            {t.rich('rights', { year, brand: (chunks) => <bdi>{chunks}</bdi> })}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <Link href="/#contact" className="text-brand-muted hover:text-brand-ink">
              {t('contact')}
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-brand-muted hover:text-brand-ink">
              {t('privacy')}
            </Link>
          </li>
          <li>
            <Link href="/terms" className="text-brand-muted hover:text-brand-ink">
              {t('terms')}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
