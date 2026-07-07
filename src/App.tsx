import { useState } from 'react';
import { TabBar, type TabId } from './components/TabBar';
import { Today } from './views/Today';
import { Trends } from './views/Trends';
import { Photos } from './views/Photos';
import type { Entry } from './domain/entries';
import { upsertEntry } from './domain/entries';
import { loadState, saveState } from './domain/storage';

export default function App() {
  const [tab, setTab] = useState<TabId>('dnes');
  const [entries, setEntries] = useState<Entry[]>(() => loadState().entries);

  const handleSave = (entry: Entry) => {
    const next = upsertEntry(entries, entry);
    setEntries(next);
    saveState({ entries: next });
  };

  return (
    <div className="app">
      <main className="app__content">
        {tab === 'dnes' && <Today entries={entries} onSave={handleSave} />}
        {tab === 'trendy' && <Trends entries={entries} />}
        {tab === 'fotky' && <Photos />}
      </main>
      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}
