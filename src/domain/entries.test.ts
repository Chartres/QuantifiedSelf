import { describe, expect, it } from 'vitest';
import { upsertEntry, latestValue, seriesFor, type Entry } from './entries';

describe('upsertEntry', () => {
  it('adds a new entry when the date is not present', () => {
    const result = upsertEntry([], { date: '2026-07-01', wallGapCm: 5 });
    expect(result).toEqual([{ date: '2026-07-01', wallGapCm: 5 }]);
  });

  it('merges a partial update into an existing entry, keeping other fields', () => {
    const existing: Entry[] = [{ date: '2026-07-01', wallGapCm: 5, energy: 3 }];
    const result = upsertEntry(existing, { date: '2026-07-01', wallAngels: 8 });
    expect(result).toEqual([{ date: '2026-07-01', wallGapCm: 5, energy: 3, wallAngels: 8 }]);
  });

  it('overwrites a field when explicitly provided again', () => {
    const existing: Entry[] = [{ date: '2026-07-01', wallGapCm: 5 }];
    const result = upsertEntry(existing, { date: '2026-07-01', wallGapCm: 3 });
    expect(result).toEqual([{ date: '2026-07-01', wallGapCm: 3 }]);
  });

  it('does not mutate the input array', () => {
    const existing: Entry[] = [{ date: '2026-07-01', wallGapCm: 5 }];
    upsertEntry(existing, { date: '2026-07-01', wallGapCm: 3 });
    expect(existing[0].wallGapCm).toBe(5);
  });

  it('leaves unrelated dates untouched', () => {
    const existing: Entry[] = [
      { date: '2026-07-01', wallGapCm: 5 },
      { date: '2026-07-02', wallGapCm: 4 },
    ];
    const result = upsertEntry(existing, { date: '2026-07-02', wallGapCm: 2 });
    expect(result).toEqual([
      { date: '2026-07-01', wallGapCm: 5 },
      { date: '2026-07-02', wallGapCm: 2 },
    ]);
  });
});

describe('latestValue', () => {
  it('returns undefined when no entries have that metric', () => {
    expect(latestValue([], 'wallGapCm')).toBeUndefined();
    expect(latestValue([{ date: '2026-07-01', energy: 3 }], 'wallGapCm')).toBeUndefined();
  });

  it('returns the value from the most recent date', () => {
    const entries: Entry[] = [
      { date: '2026-07-01', wallGapCm: 5 },
      { date: '2026-07-03', wallGapCm: 2 },
      { date: '2026-07-02', wallGapCm: 4 },
    ];
    expect(latestValue(entries, 'wallGapCm')).toBe(2);
  });

  it('skips entries where the metric is unset even if later', () => {
    const entries: Entry[] = [
      { date: '2026-07-01', wallGapCm: 5 },
      { date: '2026-07-03', energy: 4 },
    ];
    expect(latestValue(entries, 'wallGapCm')).toBe(5);
  });
});

describe('seriesFor', () => {
  it('returns an empty array when nothing is logged', () => {
    expect(seriesFor([], 'hollowHoldSec')).toEqual([]);
  });

  it('returns date-sorted points, skipping unset entries', () => {
    const entries: Entry[] = [
      { date: '2026-07-03', hollowHoldSec: 30 },
      { date: '2026-07-01', hollowHoldSec: 10 },
      { date: '2026-07-02', energy: 3 },
    ];
    expect(seriesFor(entries, 'hollowHoldSec')).toEqual([
      { date: '2026-07-01', value: 10 },
      { date: '2026-07-03', value: 30 },
    ]);
  });

  it('supports wallHoldSec like the other numeric metrics', () => {
    const entries: Entry[] = [
      { date: '2026-07-01', wallHoldSec: 20 },
      { date: '2026-07-02', wallHoldSec: 35 },
    ];
    expect(seriesFor(entries, 'wallHoldSec')).toEqual([
      { date: '2026-07-01', value: 20 },
      { date: '2026-07-02', value: 35 },
    ]);
    expect(latestValue(entries, 'wallHoldSec')).toBe(35);
  });
});
