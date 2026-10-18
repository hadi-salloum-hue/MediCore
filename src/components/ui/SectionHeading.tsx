import { Reveal } from './Reveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <h2 className="font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-relaxed text-brand-muted">{subtitle}</p> : null}
    </Reveal>
  );
}
