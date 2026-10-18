import { useTranslations } from 'next-intl';
import { CheckCircle2, Clock, Stethoscope, type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

type Status = 'completed' | 'inProgress' | 'waiting';

interface Stat {
  label: string;
  value: string;
}

interface Row {
  time: string;
  patient: string;
  doctor: string;
  status: Status;
}

// Status is always shown as icon + text, never by color alone.
const STATUS_STYLES: Record<Status, { icon: LucideIcon; className: string }> = {
  completed: { icon: CheckCircle2, className: 'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200' },
  inProgress: { icon: Stethoscope, className: 'border-brand-mintBorder bg-brand-mint text-teal-800 dark:text-teal-200' },
  waiting: { icon: Clock, className: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200' }
};

/** Illustrative preview with fictional data. The badge states this clearly. */
export function DashboardPreview() {
  const t = useTranslations('preview');
  const stats = t.raw('stats') as Stat[];
  const rows = t.raw('rows') as Row[];

  return (
    <div className="animate-float rounded-xl border border-brand-border bg-brand-card p-4 shadow-pop motion-reduce:animate-none sm:p-6">
      <div className="flex items-start gap-3 border-b border-brand-border pb-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-brand-border bg-brand-surface text-sm font-bold text-brand-ink">
          {t('initials')}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold text-brand-ink">{t('clinicName')}</p>
          <p className="text-xs text-brand-muted">{t('subtitle')}</p>
        </div>
        <span className="hidden shrink-0 rounded-full border border-brand-border bg-brand-surface px-2.5 py-1 text-xs text-brand-muted sm:inline-block">
          {t('badge')}
        </span>
      </div>

      <p className="mt-3 inline-block rounded-full border border-brand-border bg-brand-surface px-2.5 py-1 text-xs text-brand-muted sm:hidden">
        {t('badge')}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((stat, index) => (
          <div key={stat.label} className="rounded-lg border border-brand-border bg-brand-surface p-2.5 sm:p-3">
            <dt className="text-xs text-brand-muted">{stat.label}</dt>
            <dd className={clsx('mt-1 font-display text-xl font-bold', index === 1 ? 'text-brand-teal' : 'text-brand-ink')}>
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-4 space-y-2">
        {rows.map((row, index) => {
          const { icon: Icon, className } = STATUS_STYLES[row.status];
          return (
            <li
              key={row.time}
              style={{ animationDelay: `${650 + index * 150}ms` }}
              className="animate-rise grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-lg border border-brand-border bg-brand-bg px-3 py-2.5"
            >
              <span className="w-[4.25rem] text-xs font-semibold tabular-nums text-brand-ink">
                <bdi dir="ltr">{row.time}</bdi>
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-brand-text">{row.patient}</p>
                <p className="break-words text-xs text-brand-muted">{row.doctor}</p>
              </div>
              <span className={clsx('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium', className)}>
                <Icon aria-hidden className="h-3.5 w-3.5" />
                {t(`status.${row.status}`)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
