import type { ReactNode } from 'react';
import { BackButton } from './BackButton';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { ScrollToTop } from './ScrollToTop';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <BackButton />
      <main id="main">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
