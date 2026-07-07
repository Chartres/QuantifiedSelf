import { describe, expect, it } from 'vitest';
import { todayISO } from './date';

describe('todayISO', () => {
  it('formats a date as YYYY-MM-DD using local time', () => {
    expect(todayISO(new Date(2026, 6, 7))).toBe('2026-07-07');
  });

  it('pads single-digit months and days', () => {
    expect(todayISO(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
