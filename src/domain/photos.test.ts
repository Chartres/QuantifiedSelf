import { describe, expect, it } from 'vitest';
import { monthKeyFor, sortMonthsDesc } from './photos';

describe('monthKeyFor', () => {
  it('formats a date as YYYY-MM', () => {
    expect(monthKeyFor(new Date(2026, 6, 7))).toBe('2026-07');
  });

  it('pads single-digit months', () => {
    expect(monthKeyFor(new Date(2026, 0, 15))).toBe('2026-01');
  });
});

describe('sortMonthsDesc', () => {
  it('sorts month keys with the most recent first', () => {
    expect(sortMonthsDesc(['2026-01', '2026-07', '2025-12'])).toEqual([
      '2026-07',
      '2026-01',
      '2025-12',
    ]);
  });

  it('handles an empty list', () => {
    expect(sortMonthsDesc([])).toEqual([]);
  });

  it('does not mutate the input', () => {
    const input = ['2026-01', '2026-07'];
    sortMonthsDesc(input);
    expect(input).toEqual(['2026-01', '2026-07']);
  });
});
