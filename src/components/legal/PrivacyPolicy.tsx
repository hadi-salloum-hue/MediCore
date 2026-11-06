import { useLocale, useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';
import { PRIVACY_LAST_UPDATED, getLegalConfig } from '@/lib/legal';

interface TableData {
  headers: string[];
  rows: string[][];
}

interface PolicySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
  table?: TableData;
  after?: string[];
}

const paragraph = 'mt-3 text-base leading-relaxed text-brand-muted';

function Paragraphs({ items }: { items?: string[] }) {
  return (
    <>
      {items?.map((text) => (
        <p key={text} className={paragraph}>
          {text}
        </p>
      ))}
    </>
  );
}

function PendingValue({ label }: { label: string }) {
  return (
    <span className="rounded bg-amber-100 px-2 py-0.5 text-sm text-amber-900 dark:bg-amber-950/60 dark:text-amber-100">
      [{label}]
    </span>
  );
}

/** Privacy notice. Text comes from messages -> privacyPolicy; the organization name and email from env vars. */
export function PrivacyPolicy() {
  const t = useTranslations('privacyPolicy');
  const locale = useLocale();
  const { entity, email, reviewed } = getLegalConfig();

  const intro = t.raw('intro') as string[];
  const sections = t.raw('sections') as PolicySection[];
  // "ar-u-nu-latn" keeps Western digits in the Arabic date.
  const updated = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en', {
    dateStyle: 'long',
    timeZone: 'UTC'
  }).format(new Date(PRIVACY_LAST_UPDATED));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      <h1 className="font-display text-3xl font-bold text-brand-ink">{t('title')}</h1>
      <p className="mt-2 text-sm text-brand-muted">
        {t('lastUpdated')}: <time dateTime={PRIVACY_LAST_UPDATED}>{updated}</time>
      </p>

      {!reviewed ? (
        <p
          role="note"
          className="mt-6 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100"
        >
          <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          {t('draftNotice')}
        </p>
      ) : null}

      <Paragraphs items={intro} />

      {sections.map((section, index) => (
        <section key={section.title} aria-labelledby={`privacy-section-${index}`}>
          <h2 id={`privacy-section-${index}`} className="mt-10 font-display text-xl font-bold text-brand-ink">
            {index + 1}. {section.title}
          </h2>

          <Paragraphs items={section.paragraphs} />

          {section.list ? (
            <ul className="mt-3 list-disc space-y-1.5 ps-6 text-base leading-relaxed text-brand-muted marker:text-brand-teal">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {section.table ? (
            <div className="mt-4 overflow-x-auto rounded-lg border border-brand-border">
              <table className="w-full min-w-[32rem] text-start text-sm">
                <thead className="bg-brand-surface text-brand-ink">
                  <tr>
                    {section.table.headers.map((header) => (
                      <th key={header} scope="col" className="px-4 py-2.5 text-start font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row[0]} className="border-t border-brand-border">
                      {row.map((cell, cellIndex) =>
                        cellIndex === 0 ? (
                          <th key={cell} scope="row" className="px-4 py-2.5 text-start font-semibold text-brand-ink">
                            <bdi dir="ltr">{cell}</bdi>
                          </th>
                        ) : (
                          <td key={cell} className="px-4 py-2.5 text-brand-muted">
                            {cell}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          <Paragraphs items={section.after} />
        </section>
      ))}

      <section aria-labelledby="privacy-contact">
        <h2 id="privacy-contact" className="mt-10 font-display text-xl font-bold text-brand-ink">
          {sections.length + 1}. {t('contact.title')}
        </h2>
        <dl className="mt-3 space-y-2 text-base text-brand-muted">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-brand-ink">{t('contact.entity')}:</dt>
            <dd>{entity ? <bdi>{entity}</bdi> : <PendingValue label={t('contact.pending')} />}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-brand-ink">{t('contact.email')}:</dt>
            <dd>
              {email ? (
                <a href={`mailto:${email}`} className="font-semibold text-brand-ink underline underline-offset-2">
                  <bdi dir="ltr">{email}</bdi>
                </a>
              ) : (
                <PendingValue label={t('contact.pending')} />
              )}
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
