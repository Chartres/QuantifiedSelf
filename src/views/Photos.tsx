import { useEffect, useRef, useState } from 'react';
import { getPhoto, listMonths, monthKeyFor, savePhoto } from '../domain/photos';

export function Photos() {
  const [months, setMonths] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshMonths = async () => {
    const m = await listMonths();
    setMonths(m);
  };

  useEffect(() => {
    refreshMonths();
  }, []);

  useEffect(() => {
    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ensureUrl = async (monthKey: string) => {
    if (urls[monthKey]) return;
    const blob = await getPhoto(monthKey);
    if (!blob) return;
    setUrls((prev) => ({ ...prev, [monthKey]: URL.createObjectURL(blob) }));
  };

  useEffect(() => {
    selected.forEach((m) => {
      ensureUrl(m);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleFile = async (file: File) => {
    const monthKey = monthKeyFor();
    await savePhoto(monthKey, file);
    if (urls[monthKey]) {
      URL.revokeObjectURL(urls[monthKey]);
      setUrls((prev) => {
        const next = { ...prev };
        delete next[monthKey];
        return next;
      });
    }
    await refreshMonths();
  };

  const toggleSelect = (monthKey: string) => {
    setSelected((prev) => {
      if (prev.includes(monthKey)) return prev.filter((m) => m !== monthKey);
      if (prev.length >= 2) return [prev[1], monthKey];
      return [...prev, monthKey];
    });
  };

  return (
    <div className="view view--photos">
      <h1 className="view__title">Fotky</h1>

      <button
        type="button"
        className="photos__add-btn"
        onClick={() => fileInputRef.current?.click()}
      >
        + Nová fotka ({monthKeyFor()})
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="photos__file-input"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {months.length === 0 && <p className="photos__empty">Zatím žádné fotky.</p>}

      <div className="photos__grid">
        {months.map((monthKey) => (
          <button
            key={monthKey}
            type="button"
            className={`photos__month${selected.includes(monthKey) ? ' photos__month--selected' : ''}`}
            onClick={() => toggleSelect(monthKey)}
          >
            {monthKey}
          </button>
        ))}
      </div>

      {selected.length === 2 && (
        <div className="photos__compare">
          {selected.map((monthKey) => (
            <div key={monthKey} className="photos__compare-item">
              <span className="photos__compare-label">{monthKey}</span>
              {urls[monthKey] ? (
                <img src={urls[monthKey]} alt={`Fotka postoje ${monthKey}`} />
              ) : (
                <span className="photos__compare-loading">Načítám…</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
