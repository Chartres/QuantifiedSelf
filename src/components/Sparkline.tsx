type SparklineProps = {
  points: { date: string; value: number }[];
  goal?: number;
  width?: number;
  height?: number;
};

/** Minimal inline SVG sparkline with an optional dashed goal line. No chart library. */
export function Sparkline({ points, goal, width = 300, height = 80 }: SparklineProps) {
  if (points.length === 0) {
    return (
      <svg width={width} height={height} role="img" aria-label="Zatím žádná data">
        <text x={width / 2} y={height / 2} textAnchor="middle" className="sparkline__empty">
          Zatím žádná data
        </text>
      </svg>
    );
  }

  const values = points.map((p) => p.value);
  const allValues = goal !== undefined ? [...values, goal] : values;
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const padding = 8;

  const toX = (i: number) =>
    points.length === 1
      ? width / 2
      : padding + (i / (points.length - 1)) * (width - padding * 2);
  const toY = (v: number) => height - padding - ((v - min) / range) * (height - padding * 2);

  const linePoints = points.map((p, i) => `${toX(i)},${toY(p.value)}`).join(' ');
  const last = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Trend, poslední hodnota ${last.value}`}
      className="sparkline"
    >
      {goal !== undefined && (
        <line
          x1={padding}
          x2={width - padding}
          y1={toY(goal)}
          y2={toY(goal)}
          className="sparkline__goal"
          strokeDasharray="4 4"
        />
      )}
      <polyline points={linePoints} className="sparkline__line" fill="none" />
      <circle cx={toX(points.length - 1)} cy={toY(last.value)} r={4} className="sparkline__dot" />
    </svg>
  );
}
