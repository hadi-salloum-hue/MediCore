import { setRequestLocale } from 'next-intl/server';
import { SiteShell } from '@/components/layout/SiteShell';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { Steps } from '@/components/sections/Steps';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <SiteShell>
      <Hero />
      <Features />
      <Steps />
      <Faq />
      <FinalCta />
    </SiteShell>
  );
}
