import { useTranslations } from 'next-intl';
import { BarChart3, CalendarDays, FolderOpen, Globe, Receipt, Users, type LucideIcon } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

// Same order as messages -> features.items
const ICONS: LucideIcon[] = [CalendarDays, FolderOpen, Users, Receipt, BarChart3, Globe];

interface FeatureItem {
  title: string;
  description: string;
}

export function Features() {
  const t = useTranslations('features');
  const items = t.raw('items') as FeatureItem[];

  return (
    <section id="features" className="bg-brand-surface py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICONS[index] ?? CalendarDays;
            return (
              <Reveal as="li" key={item.title} delay={(index % 3) * 110} className="h-full">
                <div className="group h-full rounded-xl border border-brand-border bg-brand-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-pop">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-brand-border bg-brand-surface text-brand-ink transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    <Icon aria-hidden className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
