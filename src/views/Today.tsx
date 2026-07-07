import { useMemo, useState } from 'react';
import type { Entry } from '../domain/entries';
import { latestValue } from '../domain/entries';
import { todayISO } from '../domain/date';
import { Stepper } from '../components/Stepper';

type TodayProps = {
  entries: Entry[];
  onSave: (entry: Entry) => void;
};

const ENERGY_LEVELS: { value: 1 | 2 | 3 | 4 | 5; label: string }[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

export function Today({ entries, onSave }: TodayProps) {
  const [date, setDate] = useState(todayISO());

  const defaults = useMemo(
    () => ({
      wallGapCm: (latestValue(entries, 'wallGapCm') as number | undefined) ?? 0,
      wallAngels: (latestValue(entries, 'wallAngels') as number | undefined) ?? 0,
      hollowHoldSec: (latestValue(entries, 'hollowHoldSec') as number | undefined) ?? 0,
      wallHoldSec: (latestValue(entries, 'wallHoldSec') as number | undefined) ?? 0,
      energy: (latestValue(entries, 'energy') as 1 | 2 | 3 | 4 | 5 | undefined) ?? 3,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries.length],
  );

  const [wallGapCm, setWallGapCm] = useState(defaults.wallGapCm);
  const [wallAngels, setWallAngels] = useState(defaults.wallAngels);
  const [hollowHoldSec, setHollowHoldSec] = useState(defaults.hollowHoldSec);
  const [wallHoldSec, setWallHoldSec] = useState(defaults.wallHoldSec);
  const [energy, setEnergy] = useState<1 | 2 | 3 | 4 | 5>(defaults.energy);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave({ date, wallGapCm, wallAngels, hollowHoldSec, wallHoldSec, energy });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="view view--today">
      <h1 className="view__title">Dnes</h1>

      <label className="field">
        <span className="field__label">Datum</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="field__input"
        />
      </label>

      <Stepper
        label="Test u zdi (mezera)"
        value={wallGapCm}
        unit=" cm"
        step={0.5}
        onChange={setWallGapCm}
      />

      <Stepper label="Wall angels (opakování)" value={wallAngels} onChange={setWallAngels} />

      <Stepper
        label="Hollow hold (výdrž)"
        value={hollowHoldSec}
        unit=" s"
        step={5}
        onChange={setHollowHoldSec}
      />

      <Stepper
        label="Stoj u zdi (výdrž)"
        value={wallHoldSec}
        unit=" s"
        step={5}
        onChange={setWallHoldSec}
      />

      <div className="field">
        <span className="field__label">Energie</span>
        <div className="energy-picker" role="radiogroup" aria-label="Energie dnes">
          {ENERGY_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              role="radio"
              aria-checked={energy === level.value}
              className={`energy-picker__seg${energy === level.value ? ' energy-picker__seg--active' : ''}`}
              onClick={() => setEnergy(level.value)}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className="save-bar">
        <button type="button" className="save-bar__btn" onClick={handleSave}>
          {saved ? 'Uloženo ✓' : 'Uložit'}
        </button>
      </div>
    </div>
  );
}
