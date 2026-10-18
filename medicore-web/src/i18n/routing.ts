import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // Remember the visitor's last language for a year, so opening the site root restores it.
  localeCookie: { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' }
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
