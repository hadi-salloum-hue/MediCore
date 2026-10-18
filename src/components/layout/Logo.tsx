import clsx from 'clsx';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface LogoProps {
  /**
   * "horizontal" = icon + wordmark, "icon" = MC mark only,
   * "adaptive" = icon only below the `sm` breakpoint, icon + wordmark from `sm` up.
   */
  variant?: 'horizontal' | 'icon' | 'adaptive';
  linked?: boolean;
  /** Preload the images (use for the logo in the page header). */
  priority?: boolean;
  className?: string;
}

// Light files = the supplied final logo (only transparent margins were trimmed).
// Dark files = the same artwork with the navy parts turned light so it stays readable
// on the dark theme (generated; replace with the official reversed logo when available).
const ASSETS = {
  horizontal: {
    light: { src: '/brand/logo-horizontal.png', width: 253, height: 63 },
    dark: { src: '/brand/logo-horizontal-dark.png', width: 253, height: 63 }
  },
  icon: {
    light: { src: '/brand/logo-icon.png', width: 392, height: 376 },
    dark: { src: '/brand/logo-icon-dark.png', width: 392, height: 376 }
  }
} as const;

interface ThemedImageProps {
  asset: (typeof ASSETS)[keyof typeof ASSETS];
  alt: string;
  priority: boolean;
  className?: string;
}

function ThemedImage({ asset, alt, priority, className }: ThemedImageProps) {
  return (
    <>
      <Image {...asset.light} alt={alt} priority={priority} className={clsx(className, 'dark:hidden')} />
      <Image {...asset.dark} alt={alt} priority={priority} className={clsx(className, 'hidden dark:block')} />
    </>
  );
}

export function Logo({ variant = 'horizontal', linked = true, priority = false, className }: LogoProps) {
  const t = useTranslations('nav');
  const alt = linked ? '' : 'MediCore';

  const image =
    variant === 'adaptive' ? (
      <>
        <span className="inline-flex sm:hidden">
          <ThemedImage asset={ASSETS.icon} alt={alt} priority={priority} className={className} />
        </span>
        <span className="hidden sm:inline-flex">
          <ThemedImage asset={ASSETS.horizontal} alt={alt} priority={priority} className={className} />
        </span>
      </>
    ) : (
      <span className="inline-flex">
        <ThemedImage asset={ASSETS[variant]} alt={alt} priority={priority} className={className} />
      </span>
    );

  if (!linked) return image;

  return (
    <Link href="/" aria-label={t('homeLabel')} className="inline-flex shrink-0 items-center rounded-md">
      {image}
    </Link>
  );
}
