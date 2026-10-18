import { useTranslations } from 'next-intl';
import { ContactButton } from '../demo/ContactButton';
import { DemoButton } from '../demo/DemoButton';
import { Reveal } from '../ui/Reveal';

export function FinalCta() {
  const t = useTranslations('cta');

  return (
    <section id="contact" className="bg-brand-bg py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal from="scale">
          <div className="animate-gradient rounded-2xl bg-gradient-to-br from-brand-navy via-[#0F4C5C] to-brand-navy bg-[length:200%_200%] px-6 py-12 text-center shadow-modal motion-reduce:animate-none sm:px-12 md:py-16 dark:border dark:border-brand-border">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{t('title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200">{t('description')}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <DemoButton showArrow />
              <ContactButton />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
