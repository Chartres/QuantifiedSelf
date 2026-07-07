export type TabId = 'dnes' | 'trendy' | 'cviceni' | 'fotky';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'dnes', label: 'Dnes', icon: '📝' },
  { id: 'trendy', label: 'Trendy', icon: '📈' },
  { id: 'cviceni', label: 'Cvičení', icon: '🤸' },
  { id: 'fotky', label: 'Fotky', icon: '📷' },
];

type TabBarProps = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="tabbar" aria-label="Hlavní navigace">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tabbar__tab${tab.id === active ? ' tabbar__tab--active' : ''}`}
          onClick={() => onChange(tab.id)}
          aria-current={tab.id === active ? 'page' : undefined}
        >
          <span className="tabbar__icon" aria-hidden="true">
            {tab.icon}
          </span>
          <span className="tabbar__label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
