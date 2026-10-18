import { NextResponse } from 'next/server';
import { demoRequestPayloadSchema } from '@/lib/demo-request-schema';
import { isRateLimited } from '@/lib/rate-limit';

export const runtime = 'nodejs';

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (process.env.NODE_ENV === 'production' && isRateLimited(ip)) {
    return json({ ok: false, error: 'rate_limited' }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Validation always runs on the server too; the browser form is not trusted.
  const parsed = demoRequestPayloadSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, error: 'validation' }, 422);

  const { website, consent: _consent, ...rest } = parsed.data;
  // The typed specialty only makes sense when "other" was chosen.
  const data = { ...rest, specialtyOther: rest.specialty === 'other' ? rest.specialtyOther : '' };

  // Honeypot filled: pretend success, do nothing.
  if (website) return json({ ok: true });

  const webhookUrl = process.env.DEMO_REQUEST_WEBHOOK_URL;

  if (!webhookUrl) {
    // Never pretend to deliver in production without a destination.
    if (process.env.NODE_ENV === 'production') return json({ ok: false, error: 'not_configured' }, 503);
    console.info('[demo-request] received in development. Not forwarded: DEMO_REQUEST_WEBHOOK_URL is empty.');
    return json({ ok: true, forwarded: false });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, consentGiven: true, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) return json({ ok: false, error: 'upstream_failed' }, 502);
  } catch {
    return json({ ok: false, error: 'upstream_unreachable' }, 502);
  }

  return json({ ok: true, forwarded: true });
}
