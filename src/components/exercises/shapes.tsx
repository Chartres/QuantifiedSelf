/**
 * Small reusable building blocks for the hand-drawn exercise illustrations.
 * Kept stroke-based (no fills, no images) so they theme via CSS custom
 * properties and stay crisp/hand-readable at any size.
 */

type Pt = [number, number];

/** Ground line with a few hatch ticks below it, like an architectural floor. */
export function Floor({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const ticks = [];
  for (let x = x1 + 4; x <= x2 - 4; x += 14) {
    ticks.push(
      <line
        key={x}
        x1={x}
        y1={y}
        x2={x - 6}
        y2={y + 8}
        className="exercise-illustration__surface"
        strokeWidth={1.5}
      />,
    );
  }
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className="exercise-illustration__surface" />
      {ticks}
    </g>
  );
}

/** Vertical wall line with hatch ticks on the given side, like a wall in section. */
export function WallVertical({
  x,
  y1,
  y2,
  side = 'left',
}: {
  x: number;
  y1: number;
  y2: number;
  side?: 'left' | 'right';
}) {
  const dir = side === 'left' ? -1 : 1;
  const ticks = [];
  for (let y = y1 + 4; y <= y2 - 4; y += 14) {
    ticks.push(
      <line
        key={y}
        x1={x}
        y1={y}
        x2={x + dir * 8}
        y2={y - 6}
        className="exercise-illustration__surface"
        strokeWidth={1.5}
      />,
    );
  }
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} className="exercise-illustration__surface" />
      {ticks}
    </g>
  );
}

/** Curved motion arrow with a hand-placed triangular arrowhead. */
export function CurvedArrow({
  d,
  tip,
  angleDeg,
  size = 9,
}: {
  d: string;
  tip: Pt;
  angleDeg: number;
  size?: number;
}) {
  const rad = (angleDeg * Math.PI) / 180;
  const [x, y] = tip;
  const backX = x - size * Math.cos(rad);
  const backY = y - size * Math.sin(rad);
  const perpX = Math.sin(rad) * size * 0.55;
  const perpY = -Math.cos(rad) * size * 0.55;
  const points = `${x},${y} ${backX + perpX},${backY + perpY} ${backX - perpX},${backY - perpY}`;
  return (
    <g>
      <path d={d} className="exercise-illustration__arrow" />
      <polygon points={points} className="exercise-illustration__arrowhead" />
    </g>
  );
}

/** Side-view stick figure: head + torso line + one leg + one arm (2-3 joints each). */
export function Figure({
  head,
  neck,
  hip,
  knee,
  foot,
  shoulder,
  elbow,
  hand,
  ghost = false,
  showLegs = true,
}: {
  head: Pt;
  neck: Pt;
  hip: Pt;
  knee: Pt;
  foot: Pt;
  shoulder: Pt;
  elbow: Pt;
  hand: Pt;
  ghost?: boolean;
  /** Set false when the legs are identical to the other pose, to avoid redundant overlapping lines. */
  showLegs?: boolean;
}) {
  const cls = `exercise-illustration__figure${ghost ? ' exercise-illustration__figure--ghost' : ''}`;
  return (
    <g className={cls}>
      <circle cx={head[0]} cy={head[1]} r={9} />
      <line x1={neck[0]} y1={neck[1]} x2={hip[0]} y2={hip[1]} />
      {showLegs && <polyline points={`${hip.join(',')} ${knee.join(',')} ${foot.join(',')}`} />}
      <polyline points={`${shoulder.join(',')} ${elbow.join(',')} ${hand.join(',')}`} />
    </g>
  );
}

/** Front-view stick figure with two symmetric arms (for wall angels). */
export function FrontFigure({
  head,
  neck,
  hip,
  leftFoot,
  rightFoot,
  leftShoulder,
  leftElbow,
  leftHand,
  rightShoulder,
  rightElbow,
  rightHand,
  ghost = false,
  showLegs = true,
}: {
  head: Pt;
  neck: Pt;
  hip: Pt;
  leftFoot: Pt;
  rightFoot: Pt;
  leftShoulder: Pt;
  leftElbow: Pt;
  leftHand: Pt;
  rightShoulder: Pt;
  rightElbow: Pt;
  rightHand: Pt;
  ghost?: boolean;
  /** Set false when the legs are identical to the other pose, to avoid redundant overlapping lines. */
  showLegs?: boolean;
}) {
  const cls = `exercise-illustration__figure${ghost ? ' exercise-illustration__figure--ghost' : ''}`;
  return (
    <g className={cls}>
      <circle cx={head[0]} cy={head[1]} r={9} />
      <line x1={neck[0]} y1={neck[1]} x2={hip[0]} y2={hip[1]} />
      {showLegs && (
        <>
          <line x1={hip[0]} y1={hip[1]} x2={leftFoot[0]} y2={leftFoot[1]} />
          <line x1={hip[0]} y1={hip[1]} x2={rightFoot[0]} y2={rightFoot[1]} />
        </>
      )}
      <polyline points={`${leftShoulder.join(',')} ${leftElbow.join(',')} ${leftHand.join(',')}`} />
      <polyline
        points={`${rightShoulder.join(',')} ${rightElbow.join(',')} ${rightHand.join(',')}`}
      />
    </g>
  );
}
