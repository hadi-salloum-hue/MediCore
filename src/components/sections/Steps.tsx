import { useTranslations } from 'next-intl';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

interface StepItem {
  title: string;
  description: string;
}

// Timeline: vertical on mobile, horizontal from md. Positions use logical
// properties (start/end), so the line and badges mirror automatically in RTL.
// The badge pop and line drawing animations live in globals.css (.step-badge, .step-line).
export function Steps() {
  const t = useTranslations('steps');
  const items = t.raw('items') as StepItem[];

  return (
    <section id="how-it-works" className="bg-brand-bg py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 160} className="relative flex gap-4 md:block">
              <span
                aria-hidden
                className="step-badge relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-navy font-display text-sm font-bold text-white ring-4 ring-brand-bg md:mb-4"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {index < items.length - 1 ? (
                <span
                  aria-hidden
                  className="step-line absolute -bottom-4 start-[19px] top-12 w-0.5 bg-brand-accent/40 md:bottom-auto md:start-12 md:top-[19px] md:h-0.5 md:w-[calc(100%-2rem)]"
                />
              ) : null}

              <div className="flex-1 rounded-xl border border-brand-border bg-brand-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop">
                <h3 className="font-display text-base font-bold text-brand-ink">
                  <span className="sr-only">{index + 1}. </span>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
