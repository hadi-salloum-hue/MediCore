'use client';

import { useState, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { AlertCircle, Check, CheckCircle2, ChevronDown, Loader2, X } from 'lucide-react';
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';
import { SPECIALTIES, demoRequestSchema, type DemoRequestValues } from '@/lib/demo-request-schema';
import { Logo } from '../layout/Logo';
import { Button } from '../ui/Button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Compact (40px) below lg to keep the dialog short on phones and tablets; 44px from lg up.
const inputClass = (invalid: boolean) =>
  clsx(
    'h-10 w-full rounded-lg border bg-brand-bg px-3 text-base text-brand-text transition-colors sm:text-sm lg:h-11',
    'placeholder:text-slate-500 dark:placeholder:text-slate-400',
    'focus:border-brand-accent focus:outline-none focus:ring-[3px] focus:ring-brand-accent/25',
    invalid ? 'border-red-600 dark:border-red-400' : 'border-slate-300 dark:border-slate-600'
  );

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-brand-ink lg:mb-1.5">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 flex items-start gap-1.5 text-sm text-red-700 dark:text-red-300">
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DemoDialog({ open, onOpenChange }: DemoDialogProps) {
  const t = useTranslations('dialog');
  const te = useTranslations('errors');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<DemoRequestValues>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: { name: '', clinic: '', email: '', specialty: '', specialtyOther: '', consent: false, website: '' }
  });

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const submitting = status === 'submitting';
  const showOtherSpecialty = watch('specialty') === 'other';
  const errorText = (message?: string) => (message ? te(message) : undefined);

  async function onSubmit(values: DemoRequestValues) {
    setStatus('submitting');
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale })
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      // Reset after the dialog has closed so the content doesn't flash.
      window.setTimeout(() => {
        setStatus('idle');
        reset();
      }, 200);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in">
          {/* min-h-full + grid keeps the card centered when short and fully scrollable when tall. */}
          <div className="grid min-h-full place-items-center p-3 sm:p-4">
            <Dialog.Content className="relative w-full max-w-lg rounded-xl border border-brand-border bg-brand-card p-4 shadow-modal data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in sm:p-5 lg:p-8">
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={t('close')}
                  className="absolute end-2 top-2 grid h-11 w-11 place-items-center rounded-lg text-brand-muted hover:bg-brand-surface hover:text-brand-ink lg:end-3 lg:top-3"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </Dialog.Close>

              <div className="mb-3 pe-10 lg:mb-6">
                {/* Icon beside the title on small/medium screens, stacked above it on large ones. */}
                <div className="flex items-center gap-3 lg:block">
                  <Logo variant="icon" linked={false} className="h-7 w-auto lg:h-9" />
                  <Dialog.Title className="font-display text-lg font-bold text-brand-ink lg:mt-4 lg:text-xl">
                    {t('title')}
                  </Dialog.Title>
                </div>
                <Dialog.Description className="mt-1 text-xs text-brand-muted lg:text-sm">{t('description')}</Dialog.Description>
              </div>

              {status === 'success' ? (
                <div role="status" className="py-4 text-center">
                  <CheckCircle2 aria-hidden className="mx-auto h-12 w-12 animate-pop-in text-brand-teal" />
                  <p className="mt-4 font-display text-lg font-bold text-brand-ink">{t('success.title')}</p>
                  <p className="mt-2 text-sm text-brand-muted">{t('success.message')}</p>
                  <Button className="mt-6 w-full" onClick={() => handleOpenChange(false)}>
                    {t('success.done')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={submitting}>
                  {/* Two columns on tablets (sm to lg) to keep the form short; single column elsewhere. */}
                  <fieldset disabled={submitting} className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
                    <Field id="demo-name" label={t('name')} error={errorText(errors.name?.message)}>
                      <input
                        id="demo-name"
                        type="text"
                        autoComplete="name"
                        placeholder={t('namePlaceholder')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'demo-name-error' : undefined}
                        className={inputClass(Boolean(errors.name))}
                        {...register('name')}
                      />
                    </Field>

                    <Field id="demo-clinic" label={t('clinic')} error={errorText(errors.clinic?.message)}>
                      <input
                        id="demo-clinic"
                        type="text"
                        autoComplete="organization"
                        placeholder={t('clinicPlaceholder')}
                        aria-invalid={Boolean(errors.clinic)}
                        aria-describedby={errors.clinic ? 'demo-clinic-error' : undefined}
                        className={inputClass(Boolean(errors.clinic))}
                        {...register('clinic')}
                      />
                    </Field>

                    <Field id="demo-email" label={t('email')} error={errorText(errors.email?.message)}>
                      <input
                        id="demo-email"
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                        placeholder={t('emailPlaceholder')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'demo-email-error' : undefined}
                        className={inputClass(Boolean(errors.email))}
                        {...register('email')}
                      />
                    </Field>

                    <Field id="demo-specialty" label={t('specialty')}>
                      {/* Custom dropdown instead of the browser's native list: it is themed, mirrors in RTL, scrolls
                          inside the available screen height and flips upward when there is no room below. */}
                      <Controller
                        name="specialty"
                        control={control}
                        render={({ field }) => (
                          <Select.Root value={field.value} onValueChange={field.onChange} dir={dir}>
                            <Select.Trigger
                              id="demo-specialty"
                              ref={field.ref}
                              onBlur={field.onBlur}
                              className={clsx(
                                inputClass(false),
                                'flex items-center justify-between gap-2 text-start data-[placeholder]:text-slate-500 dark:data-[placeholder]:text-slate-400'
                              )}
                            >
                              <Select.Value placeholder={t('specialtyPlaceholder')} />
                              <Select.Icon>
                                <ChevronDown aria-hidden className="h-4 w-4 text-brand-muted" />
                              </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content
                                position="popper"
                                sideOffset={6}
                                collisionPadding={12}
                                className="z-[60] max-h-[min(18rem,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-brand-border bg-brand-card shadow-modal data-[state=closed]:animate-fade-out data-[state=open]:animate-menu-in"
                              >
                                <Select.Viewport className="p-1">
                                  {SPECIALTIES.map((key) => (
                                    <Select.Item
                                      key={key}
                                      value={key}
                                      className="relative flex h-10 cursor-pointer select-none items-center rounded-md pe-3 ps-8 text-base text-brand-text outline-none data-[highlighted]:bg-brand-surface data-[highlighted]:text-teal-700 data-[state=checked]:font-semibold sm:text-sm dark:data-[highlighted]:text-brand-teal"
                                    >
                                      <Select.ItemIndicator className="absolute start-2 inline-flex">
                                        <Check aria-hidden className="h-4 w-4" />
                                      </Select.ItemIndicator>
                                      <Select.ItemText>{t(`specialties.${key}`)}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        )}
                      />
                    </Field>

                    {/* Appears only when "Other" is selected. No autofocus, so keyboard users can keep browsing the list. */}
                    {showOtherSpecialty ? (
                      <Field
                        id="demo-specialty-other"
                        label={t('specialtyOther')}
                        error={errorText(errors.specialtyOther?.message)}
                        className="animate-menu-in sm:col-span-2 lg:col-span-1"
                      >
                        <input
                          id="demo-specialty-other"
                          type="text"
                          maxLength={100}
                          placeholder={t('specialtyOtherPlaceholder')}
                          aria-invalid={Boolean(errors.specialtyOther)}
                          aria-describedby={errors.specialtyOther ? 'demo-specialty-other-error' : undefined}
                          className={inputClass(Boolean(errors.specialtyOther))}
                          {...register('specialtyOther')}
                        />
                      </Field>
                    ) : null}

                    <div className="sm:col-span-2 lg:col-span-1">
                      <label htmlFor="demo-consent" className="flex items-start gap-3 text-xs text-brand-text lg:text-sm">
                        <input
                          id="demo-consent"
                          type="checkbox"
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? 'demo-consent-error' : undefined}
                          className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-400 accent-brand-teal"
                          {...register('consent')}
                        />
                        <span>
                          {t.rich('consent', {
                            privacy: (chunks) => (
                              <Link
                                href="/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-brand-ink underline underline-offset-2"
                              >
                                {chunks}
                              </Link>
                            )
                          })}
                        </span>
                      </label>
                      {errors.consent ? (
                        <p id="demo-consent-error" className="mt-1 flex items-start gap-1.5 text-sm text-red-700 dark:text-red-300">
                          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{errorText(errors.consent.message)}</span>
                        </p>
                      ) : null}
                    </div>

                    {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
                    <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
                      <label>
                        Website
                        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                      </label>
                    </div>
                  </fieldset>

                  {status === 'error' ? (
                    <div
                      role="alert"
                      className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200 lg:mt-4"
                    >
                      <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                      <div>
                        <p className="font-semibold">{t('error.title')}</p>
                        <p className="mt-0.5">{t('error.message')}</p>
                      </div>
                    </div>
                  ) : null}

                  <Button type="submit" size="compact" className="mt-4 w-full lg:mt-6" disabled={submitting}>
                    {submitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
                    {submitting ? t('submitting') : t('submit')}
                  </Button>
                </form>
              )}
            </Dialog.Content>
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
