export type Metric = 'wallGapCm' | 'wallAngels' | 'hollowHoldSec' | 'wallHoldSec' | 'energy';

export type Entry = {
  date: string; // YYYY-MM-DD
  wallGapCm?: number;
  wallAngels?: number;
  hollowHoldSec?: number;
  wallHoldSec?: number;
  energy?: 1 | 2 | 3 | 4 | 5;
};

/**
 * Merge a (possibly partial) entry into the list, keyed by date.
 * Existing fields on that date are preserved unless explicitly overwritten.
 * Returns a new array (does not mutate the input).
 */
export function upsertEntry(entries: Entry[], entry: Entry): Entry[] {
  const idx = entries.findIndex((e) => e.date === entry.date);
  if (idx === -1) {
    return [...entries, { ...entry }];
  }
  const merged: Entry = { ...entries[idx], ...entry };
  const next = [...entries];
  next[idx] = merged;
  return next;
}

/** Most recent (by date) defined value for a metric, or undefined if none logged. */
export function latestValue(entries: Entry[], metric: Metric): Entry[Metric] | undefined {
  const sorted = [...entries]
    .filter((e) => e[metric] !== undefined)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return sorted[0]?.[metric];
}

/** Date-sorted (ascending) list of { date, value } points for a metric, skipping unset entries. */
export function seriesFor(
  entries: Entry[],
  metric: Metric,
): { date: string; value: number }[] {
  return entries
    .filter((e) => e[metric] !== undefined)
    .map((e) => ({ date: e.date, value: e[metric] as number }))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
