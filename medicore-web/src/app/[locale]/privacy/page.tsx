import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LegalPlaceholder } from '@/components/layout/LegalPlaceholder';

export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <LegalPlaceholder page="privacyTitle" />;
}
