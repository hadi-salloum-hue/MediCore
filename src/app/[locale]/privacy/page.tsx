import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteShell } from '@/components/layout/SiteShell';
import { PrivacyPolicy } from '@/components/legal/PrivacyPolicy';
import { getLegalConfig } from '@/lib/legal';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
  // Stays out of search engines until the text has been legally reviewed.
  return { title: `${t('title')} — MediCore`, robots: { index: getLegalConfig().reviewed, follow: true } };
}

export default function PrivacyPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return (
    <SiteShell>
      <PrivacyPolicy />
    </SiteShell>
  );
}
