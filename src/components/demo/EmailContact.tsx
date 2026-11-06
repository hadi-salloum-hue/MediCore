'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy, ExternalLink, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { buttonStyles } from '../ui/button-styles';

/**
 * A plain mailto: link does nothing on computers without a configured mail app (most webmail users).
 * So the button opens a small chooser: Gmail in the browser, the mail app, or copy the address.
 */
export function EmailContact({ email }: { email: string }) {
  const t = useTranslations('cta');
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (copyState !== 'copied') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2500);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const subject = encodeURIComponent(t('emailSubject'));
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}`;
  const mailtoUrl = `mailto:${email}?subject=${subject}`;

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  return (
    <>
      <Button variant="inverse" aria-expanded={open} aria-controls="email-options" onClick={() => setOpen((value) => !value)}>
        <Mail aria-hidden className="h-4 w-4" />
        {t('email')}
      </Button>

      {open ? (
        <div
          id="email-options"
          className="mx-auto flex w-full max-w-xl animate-menu-in flex-col gap-2 rounded-xl border border-white/20 bg-white/10 p-2 sm:flex-row"
        >
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={buttonStyles({ variant: 'inverse', size: 'compact', className: 'flex-1 !px-3' })}
          >
            <ExternalLink aria-hidden className="h-4 w-4" />
            {t('emailMenu.gmail')}
            <span className="sr-only"> ({t('opensNewTab')})</span>
          </a>
          <a
            href={mailtoUrl}
            onClick={() => setOpen(false)}
            className={buttonStyles({ variant: 'inverse', size: 'compact', className: 'flex-1 !px-3' })}
          >
            <Mail aria-hidden className="h-4 w-4" />
            {t('emailMenu.mailApp')}
          </a>
          <Button variant="inverse" size="compact" className="flex-1 !px-3" onClick={copyAddress}>
            {copyState === 'copied' ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
            {copyState === 'copied' ? t('emailMenu.copied') : t('emailMenu.copy')}
          </Button>
          {/* Announced to screen readers; the address is only shown if the browser refused to copy it. */}
          <p role="status" className="sr-only">
            {copyState === 'copied' ? t('emailMenu.copied') : ''}
          </p>
          {copyState === 'failed' ? (
            <p role="alert" className="w-full text-center text-sm text-slate-200 sm:order-last">
              {t('emailMenu.copyFailed')} <bdi dir="ltr">{email}</bdi>
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
