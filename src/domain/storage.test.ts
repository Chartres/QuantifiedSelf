import { describe, expect, it, vi } from 'vitest';
import { loadState, saveState } from './storage';

describe('loadState', () => {
  it('returns an empty state when nothing is stored', () => {
    expect(loadState()).toEqual({ entries: [] });
  });

  it('returns an empty state when the stored value is corrupt JSON', () => {
    localStorage.setItem('telo:v1', '{not valid json');
    expect(loadState()).toEqual({ entries: [] });
  });

  it('returns an empty state when the stored value is the wrong shape', () => {
    localStorage.setItem('telo:v1', JSON.stringify({ foo: 'bar' }));
    expect(loadState()).toEqual({ entries: [] });
  });

  it('returns an empty state when entries is not an array', () => {
    localStorage.setItem('telo:v1', JSON.stringify({ entries: 'nope' }));
    expect(loadState()).toEqual({ entries: [] });
  });

  it('filters out malformed entries but keeps well-formed ones', () => {
    localStorage.setItem(
      'telo:v1',
      JSON.stringify({ entries: [{ date: '2026-07-01', wallGapCm: 5 }, { oops: true }, 42] }),
    );
    expect(loadState()).toEqual({ entries: [{ date: '2026-07-01', wallGapCm: 5 }] });
  });

  it('round-trips a state saved by saveState', () => {
    const state = { entries: [{ date: '2026-07-01', wallAngels: 6 }] };
    saveState(state);
    expect(loadState()).toEqual(state);
  });
});

describe('saveState', () => {
  it('swallows a setItem failure instead of throwing', () => {
    const spy = vi.spyOn(globalThis.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => saveState({ entries: [] })).not.toThrow();
    spy.mockRestore();
  });
});
