import { describe, expect, it } from 'vitest';
import { GOALS, progressToward } from './goals';

describe('GOALS', () => {
  it('has the expected targets', () => {
    expect(GOALS).toEqual({ wallGapCm: 0, wallAngels: 10, hollowHoldSec: 60 });
  });
});

describe('progressToward', () => {
  it('wallGapCm: 0 gap is full progress (goal reached)', () => {
    expect(progressToward('wallGapCm', 0)).toBe(1);
  });

  it('wallGapCm: larger gap is less progress', () => {
    expect(progressToward('wallGapCm', 15)).toBe(0);
    expect(progressToward('wallGapCm', 7.5)).toBeCloseTo(0.5);
  });

  it('wallGapCm: never goes negative for a gap beyond the baseline', () => {
    expect(progressToward('wallGapCm', 30)).toBe(0);
  });

  it('wallAngels: reaching the goal is full progress', () => {
    expect(progressToward('wallAngels', 10)).toBe(1);
    expect(progressToward('wallAngels', 5)).toBeCloseTo(0.5);
    expect(progressToward('wallAngels', 0)).toBe(0);
  });

  it('hollowHoldSec: reaching the goal is full progress', () => {
    expect(progressToward('hollowHoldSec', 60)).toBe(1);
    expect(progressToward('hollowHoldSec', 30)).toBeCloseTo(0.5);
  });

  it('caps progress at 1 when a value exceeds its goal', () => {
    expect(progressToward('wallAngels', 20)).toBe(1);
    expect(progressToward('hollowHoldSec', 120)).toBe(1);
  });
});
