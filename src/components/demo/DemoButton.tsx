'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ButtonVariant } from '../ui/button-styles';
import { useDemoDialog } from './DemoDialogProvider';

interface DemoButtonProps {
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

/** The single primary action of the site: opens the demo request dialog. */
export function DemoButton({ variant = 'primary', className, showArrow = false, onClick }: DemoButtonProps) {
  const t = useTranslations('common');
  const { open } = useDemoDialog();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => {
        onClick?.();
        open();
      }}
    >
      {t('bookDemo')}
      {showArrow ? <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" /> : null}
    </Button>
  );
}
