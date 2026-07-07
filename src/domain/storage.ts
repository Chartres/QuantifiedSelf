import type { Entry } from './entries';

const STORAGE_KEY = 'telo:v1';

export type TeloState = {
  entries: Entry[];
};

function defaultState(): TeloState {
  return { entries: [] };
}

function isEntry(value: unknown): value is Entry {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.date === 'string';
}

/** Tolerant parse: corrupt JSON, wrong shape, or missing fields all fall back to defaults. */
function normalize(raw: unknown): TeloState {
  if (typeof raw !== 'object' || raw === null) return defaultState();
  const obj = raw as Record<string, unknown>;
  const entries = Array.isArray(obj.entries) ? obj.entries.filter(isEntry) : [];
  return { entries };
}

export function loadState(): TeloState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return defaultState();
    return normalize(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

export function saveState(state: TeloState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Swallow quota/security errors — the in-memory state still works for
    // the current session even if it can't persist.
  }
}
