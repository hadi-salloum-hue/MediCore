'use client';

import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const t = useTranslations('nav');
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label={t('theme')}
      className="relative grid h-11 w-11 place-items-center rounded-lg text-brand-muted transition-colors hover:bg-brand-surface hover:text-teal-700 dark:hover:text-brand-teal"
    >
      {/* Both icons are stacked; the theme class swaps them with a turn + fade. */}
      <Moon
        aria-hidden
        className="absolute h-5 w-5 transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
      <Sun
        aria-hidden
        className="absolute h-5 w-5 rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
