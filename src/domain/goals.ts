export type GoalMetric = 'wallGapCm' | 'wallAngels' | 'hollowHoldSec' | 'wallHoldSec';

export const DEADLINE = '2026-09-30';

/** Target values. wallGapCm goal is 0 (head touches the wall — lower is better). */
export const GOALS: Record<GoalMetric, number> = {
  wallGapCm: 0,
  wallAngels: 10,
  hollowHoldSec: 60,
  wallHoldSec: 60,
};

/**
 * Assumed worst-case starting gap used only to normalize wallGapCm progress
 * into 0-1 (there is no natural upper bound for a "lower is better" metric
 * with a goal of 0).
 */
const WALL_GAP_BASELINE_CM = 15;

/** Progress toward the goal, clamped to [0, 1]. Higher is always better. */
export function progressToward(metric: GoalMetric, value: number): number {
  if (metric === 'wallGapCm') {
    const progress = 1 - value / WALL_GAP_BASELINE_CM;
    return clamp01(progress);
  }
  const progress = value / GOALS[metric];
  return clamp01(progress);
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}
