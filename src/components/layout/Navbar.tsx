'use client';

import { useEffect, useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { DemoButton } from '../demo/DemoButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { key: 'features', href: '/#features' },
  { key: 'how', href: '/#how-it-works' },
  { key: 'faq', href: '/#faq' },
  { key: 'contact', href: '/#contact' }
] as const;

// Layout by screen size:
//  - lg and up : logo, links, language + theme + demo button in the bar.
//  - below lg  : logo + menu button. Links, language and theme live inside the menu.
//  - sm to lg  : the demo button also stays in the bar.
//  - below sm  : the logo shows the MC icon only (no wordmark).
export function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-brand-border bg-brand-bg/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'shadow-pop' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo variant="adaptive" priority className="h-9 w-auto" />

        <nav aria-label={t('mainLabel')} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-sm font-medium text-brand-muted transition-colors hover:text-teal-700 dark:hover:text-brand-teal">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <DemoButton className="hidden sm:inline-flex" />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg text-brand-ink transition-colors hover:bg-brand-surface hover:text-teal-700 dark:hover:text-brand-teal lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id={menuId} className="animate-menu-in border-t border-brand-border bg-brand-bg lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <nav aria-label={t('mainLabel')}>
              <ul className="space-y-1">
                {LINKS.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex h-11 items-center rounded-lg px-3 text-base font-medium text-brand-ink transition-colors hover:bg-brand-surface hover:text-teal-700 dark:hover:text-brand-teal"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-3 flex items-center gap-3 border-t border-brand-border pt-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <DemoButton className="mt-3 w-full sm:hidden" onClick={() => setMenuOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
