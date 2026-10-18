import { z } from 'zod';

export const SPECIALTIES = [
  'general',
  'dentistry',
  'dermatology',
  'pediatrics',
  'ophthalmology',
  'physiotherapy',
  'other'
] as const;

export type Specialty = (typeof SPECIALTIES)[number];

// The error "messages" are translation keys (see messages/*.json -> "errors").
const baseSchema = z.object({
  name: z.string().trim().min(2, 'name').max(100, 'name'),
  clinic: z.string().trim().min(2, 'clinic').max(120, 'clinic'),
  email: z.string().trim().email('email').max(254, 'email'),
  specialty: z.union([z.enum(SPECIALTIES), z.literal('')]),
  // Only used (and required) when specialty is "other".
  specialtyOther: z.string().trim().max(100, 'specialtyOther'),
  consent: z.boolean().refine((value) => value === true, { message: 'consent' }),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(200)
});

function requireOtherSpecialty(values: { specialty: string; specialtyOther: string }, ctx: z.RefinementCtx) {
  if (values.specialty === 'other' && values.specialtyOther.trim().length < 2) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['specialtyOther'], message: 'specialtyOther' });
  }
}

export const demoRequestSchema = baseSchema.superRefine(requireOtherSpecialty);

export type DemoRequestValues = z.infer<typeof demoRequestSchema>;

// Server-side payload = form values + locale.
export const demoRequestPayloadSchema = baseSchema
  .extend({ locale: z.enum(['en', 'ar']) })
  .superRefine(requireOtherSpecialty);
