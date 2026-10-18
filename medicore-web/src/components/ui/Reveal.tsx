'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

type From = 'up' | 'scale' | 'start' | 'end';

interface RevealProps {
  children: ReactNode;
  as?: 'div' | 'li';
  from?: From;
  /** Delay in ms, used to stagger siblings. */
  delay?: number;
  className?: string;
}

/**
 * Fades/slides its content in the first time it scrolls into view.
 * Styles live in globals.css ([data-reveal]); reduced-motion users see the content immediately.
 */
export function Reveal({ children, as = 'div', from = 'up', delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const Tag = as as ElementType;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={shown ? 'shown' : 'hidden'}
      data-reveal-from={from}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
