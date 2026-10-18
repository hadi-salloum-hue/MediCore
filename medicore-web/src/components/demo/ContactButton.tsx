'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { buttonStyles } from '../ui/button-styles';
import { useDemoDialog } from './DemoDialogProvider';

/** mailto link when NEXT_PUBLIC_CONTACT_EMAIL is set, otherwise opens the request form. */
export function ContactButton({ className }: { className?: string }) {
  const t = useTranslations('common');
  const { open } = useDemoDialog();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  if (email) {
    return (
      <a href={`mailto:${email}`} className={buttonStyles({ variant: 'inverse', className })}>
        <Mail aria-hidden className="h-4 w-4" />
        {t('contactUs')}
      </a>
    );
  }

  return (
    <Button variant="inverse" className={className} onClick={open}>
      <Mail aria-hidden className="h-4 w-4" />
      {t('contactUs')}
    </Button>
  );
}
