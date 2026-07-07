import type { Entry, Metric } from '../domain/entries';
import { seriesFor } from '../domain/entries';
import { GOALS, type GoalMetric } from '../domain/goals';
import { Sparkline } from '../components/Sparkline';

type TrendsProps = {
  entries: Entry[];
};

const METRICS: { metric: Metric; label: string; unit?: string; goal?: GoalMetric }[] = [
  { metric: 'wallGapCm', label: 'Test u zdi', unit: ' cm', goal: 'wallGapCm' },
  { metric: 'wallAngels', label: 'Wall angels', unit: '×', goal: 'wallAngels' },
  { metric: 'hollowHoldSec', label: 'Hollow hold', unit: ' s', goal: 'hollowHoldSec' },
  { metric: 'energy', label: 'Energie', unit: '' },
];

export function Trends({ entries }: TrendsProps) {
  return (
    <div className="view view--trends">
      <h1 className="view__title">Trendy</h1>
      {METRICS.map(({ metric, label, unit, goal }) => {
        const series = seriesFor(entries, metric);
        const baseline = series[0]?.value;
        const current = series[series.length - 1]?.value;
        const goalValue = goal ? GOALS[goal] : undefined;

        return (
          <section key={metric} className="trend-card">
            <h2 className="trend-card__title">{label}</h2>
            <div className="trend-card__stats">
              <Stat label="Aktuálně" value={current} unit={unit} />
              <Stat label="Výchozí" value={baseline} unit={unit} />
              {goalValue !== undefined && <Stat label="Cíl" value={goalValue} unit={unit} />}
            </div>
            <Sparkline points={series} goal={goalValue} />
          </section>
        );
      })}
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value?: number; unit?: string }) {
  return (
    <div className="trend-card__stat">
      <span className="trend-card__stat-label">{label}</span>
      <span className="trend-card__stat-value">{value !== undefined ? `${value}${unit ?? ''}` : '—'}</span>
    </div>
  );
}
