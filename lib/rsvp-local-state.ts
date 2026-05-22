const KEY = "rsvp_submitted_v1";

export type RsvpSubmittedEntry = {
  at: string;
  fullName?: string;
};

export function getRsvpSubmitted(): RsvpSubmittedEntry | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RsvpSubmittedEntry;
    if (!parsed?.at) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function markRsvpSubmitted(fullName?: string): void {
  if (typeof window === "undefined") return;

  const entry: RsvpSubmittedEntry = {
    at: new Date().toISOString(),
    ...(fullName?.trim() ? { fullName: fullName.trim() } : {}),
  };
  localStorage.setItem(KEY, JSON.stringify(entry));
}

export function clearRsvpSubmitted(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
