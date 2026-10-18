import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'inverse';
export type ButtonSize = 'md' | 'compact';

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  /** compact = 40px below the lg breakpoint, 44px from lg up. */
  size?: ButtonSize;
  className?: string;
}

/** Shared by <Button> and by links that must look like buttons. */
export function buttonStyles({ variant = 'primary', size = 'md', className }: ButtonStyleOptions = {}) {
  return clsx(
    'group inline-flex items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold',
    'transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    size === 'compact' ? 'h-10 lg:h-11' : 'h-11',
    'disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
    variant === 'primary' &&
      'bg-brand-accent text-brand-navy shadow-[0_2px_4px_rgba(20,184,166,0.25)] hover:bg-brand-accentHover hover:shadow-[0_8px_18px_rgba(20,184,166,0.35)]',
    variant === 'secondary' &&
      'border border-brand-border bg-brand-card text-brand-ink hover:border-slate-400 hover:bg-brand-surface dark:hover:border-slate-500',
    variant === 'inverse' &&
      'border border-white/25 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-offset-brand-navy',
    className
  );
}
