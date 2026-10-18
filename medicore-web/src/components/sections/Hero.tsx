import { useTranslations } from 'next-intl';
import { Languages, Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { DemoButton } from '../demo/DemoButton';
import { buttonStyles } from '../ui/button-styles';
import { DashboardPreview } from './DashboardPreview';

// Entrance animations here are pure CSS (no JS), so the hero never waits for hydration.
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  const t = useTranslations('hero');
  // raw() skips ICU formatting; the accent line is intentionally empty in English.
  const accent = t.raw('titleAccent') as string;

  return (
    <section className="relative overflow-hidden bg-brand-bg">
      {/* Soft moving background glows (decorative). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 animate-blob rounded-full bg-brand-accent/15 blur-3xl motion-reduce:animate-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 end-0 h-80 w-80 animate-blob rounded-full bg-brand-teal/10 blur-3xl [animation-delay:-7s] motion-reduce:animate-none"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="animate-rise" style={delay(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-xs font-medium text-brand-ink">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent" />
              {t('badge')}
            </span>
          </div>

          <h1
            className="mt-5 animate-rise font-display text-[2rem] font-bold leading-tight tracking-tight text-brand-ink sm:text-[2.5rem] lg:text-5xl"
            style={delay(100)}
          >
            {t('title')}
            {accent ? (
              <>
                <br />
                <span className="text-brand-teal">{accent}</span>
              </>
            ) : null}
          </h1>

          <p className="mt-5 max-w-xl animate-rise text-base leading-relaxed text-brand-muted sm:text-lg" style={delay(200)}>
            {t('description')}
          </p>

          <div className="mt-8 flex animate-rise flex-wrap gap-3" style={delay(300)}>
            <DemoButton showArrow />
            <Link href="/#features" className={buttonStyles({ variant: 'secondary' })}>
              {t('secondary')}
            </Link>
          </div>

          <ul className="mt-8 flex animate-rise flex-wrap items-center gap-x-6 gap-y-2 text-xs text-brand-muted" style={delay(400)}>
            <li className="flex items-center gap-2">
              <Lock aria-hidden className="h-4 w-4 text-brand-teal" />
              {t('privacy')}
            </li>
            <li className="flex items-center gap-2">
              <Languages aria-hidden className="h-4 w-4 text-brand-teal" />
              {t('languages')}
            </li>
          </ul>
        </div>

        <div className="animate-slide-end" style={delay(250)}>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
