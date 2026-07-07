type StepperProps = {
  label: string;
  value: number;
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function Stepper({ label, value, unit, step = 1, min = 0, max, onChange }: StepperProps) {
  const decrement = () => onChange(Math.max(min, roundStep(value - step)));
  const increment = () => onChange(max === undefined ? roundStep(value + step) : Math.min(max, roundStep(value + step)));

  return (
    <div className="stepper">
      <span className="stepper__label">{label}</span>
      <div className="stepper__control">
        <button
          type="button"
          className="stepper__btn"
          onClick={decrement}
          aria-label={`Snížit ${label}`}
        >
          −
        </button>
        <span className="stepper__value" aria-live="polite">
          {value}
          {unit ? <span className="stepper__unit">{unit}</span> : null}
        </span>
        <button
          type="button"
          className="stepper__btn"
          onClick={increment}
          aria-label={`Zvýšit ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function roundStep(n: number): number {
  // Avoid float drift like 0.1 + 0.2 for fractional steps (e.g. 0.5 cm).
  return Math.round(n * 100) / 100;
}
