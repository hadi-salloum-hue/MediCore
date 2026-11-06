/** Date of the latest text of the privacy notice (ISO). Update it whenever the notice changes. */
export const PRIVACY_LAST_UPDATED = '2026-10-21';

export interface LegalConfig {
  /** Name of the organization operating MediCore. */
  entity: string;
  email: string;
  /** Set NEXT_PUBLIC_LEGAL_REVIEWED=true once a lawyer has approved the legal pages. */
  reviewed: boolean;
}

export function getLegalConfig(): LegalConfig {
  return {
    entity: process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME?.trim() ?? '',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? '',
    reviewed: process.env.NEXT_PUBLIC_LEGAL_REVIEWED === 'true'
  };
}
