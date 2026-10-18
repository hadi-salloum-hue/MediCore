// Minimal in-memory limiter. It protects a single server instance only;
// on serverless/multi-instance hosting replace it with a shared store (e.g. Redis).
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    hits.forEach((times, k) => {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k);
    });
  }

  return false;
}
