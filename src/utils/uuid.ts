// utils/uuid.ts
export function isUuid(value: string): boolean {
  if (!value) return false;
  const s = (value + '').trim();
  // RFC4122 (case-insensitive)
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}

export function normalizeUuid(value: string): string {
  return (value ?? '').trim();
}
