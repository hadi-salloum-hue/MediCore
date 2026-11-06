export interface ContactChannels {
  email: string;
  /** Digits only, international format without "+" (e.g. 962791234567). Empty when not configured. */
  whatsappNumber: string;
}

export function getContactChannels(): ContactChannels {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? '';
  const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
  // A real international number has at least 8 digits; anything shorter is treated as not configured.
  return { email, whatsappNumber: digits.length >= 8 ? digits : '' };
}

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
