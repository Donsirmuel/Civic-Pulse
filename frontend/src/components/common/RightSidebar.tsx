import { useState } from 'react';
import { Icon } from './';

export default function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const briefs = [
    {
      label: 'Announcements',
      title: 'National Treasury transparency report published',
      meta: 'View update',
    },
    {
      label: 'Trending',
      title: 'Abuja Solar Streetlights',
      meta: '2.1k records shared',
    },
    {
      label: 'Suggested office',
      title: 'Gov. Babajide',
      meta: 'Follow office',
    },
  ];

  return (
    <aside
      className={`hidden lg:flex w-full flex-col gap-5 py-4 transition-all duration-300 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}
      style={{ color: 'var(--civic-text)' }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="self-end rounded-md p-2 transition hover:text-[var(--civic-primary)]"
        style={{ color: 'var(--civic-muted)' }}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <Icon name={isCollapsed ? 'chevron_left' : 'chevron_right'} className="text-xl" />
      </button>

      {!isCollapsed && (
        <>
          <div className="civic-section-soft">
            <p className="civic-label">Search</p>
            <div className="relative mt-4">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--civic-muted)]"
              />
              <input
                type="text"
                placeholder="Search posts"
                className="w-full bg-[var(--civic-surface)] py-3 pl-10 pr-4 text-sm text-[var(--civic-text)] outline-none ring-1 ring-[var(--civic-border)]"
              />
            </div>
          </div>

          {briefs.map((item) => (
            <div key={item.title} className="civic-section-soft">
              <p className="civic-label">{item.label}</p>
              <h3 className="mt-3 text-lg font-black tracking-[-0.03em] text-[var(--civic-text)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--civic-muted)]">{item.meta}</p>
            </div>
          ))}
        </>
      )}
    </aside>
  );
}
