'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

interface FaqItem {
  q: string;
  a: string;
}

export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];

  return (
    <section id="faq" className="bg-brand-surface py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <Accordion.Root type="single" collapsible className="mx-auto mt-10 max-w-3xl space-y-3">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={index * 90}>
              <Accordion.Item
                value={`item-${index}`}
                className="rounded-xl border border-brand-border bg-brand-card shadow-card transition-shadow duration-300 hover:shadow-pop"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="group flex min-h-[56px] flex-1 items-center justify-between gap-4 rounded-xl px-5 py-4 text-start text-sm font-semibold text-brand-ink sm:text-base">
                    {item.q}
                    <ChevronDown
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-brand-muted transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-5 pb-5 text-sm leading-relaxed text-brand-muted">{item.a}</div>
                </Accordion.Content>
              </Accordion.Item>
            </Reveal>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
