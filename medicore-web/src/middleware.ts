import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Only page routes: skips /api, _next and files with an extension.
  matcher: ['/', '/(ar|en)/:path*']
};
