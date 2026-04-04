import { Icon } from '../../components/common';

interface ExploreLeftSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
}

export default function ExploreLeftSidebar({
  activeTab,
  onTabChange,
  onSearchChange,
}: ExploreLeftSidebarProps) {
  const tabs = [
    {
      id: 'trending',
      label: 'Trending',
      icon: 'trending_up',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    },
    {
      id: 'local',
      label: 'Local',
      icon: 'distance',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      id: 'state',
      label: 'State',
      icon: 'apartment',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      id: 'national',
      label: 'National',
      icon: 'flag',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  const categories = [
    { id: 'infrastructure', label: 'Infrastructure', icon: 'domain', count: 342 },
    { id: 'environment', label: 'Environment', icon: 'eco', count: 256 },
    { id: 'education', label: 'Education', icon: 'school', count: 189 },
    { id: 'health', label: 'Health', icon: 'local_hospital', count: 423 },
    { id: 'safety', label: 'Safety', icon: 'security', count: 167 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Explore</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Discover what's happening</p>
      </div>

      {/* Explore Tabs */}
      <div className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary/15 border border-primary/50'
                : 'hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
            }`}
          >
            <div className={`${tab.color} p-2 rounded-md flex items-center justify-center flex-shrink-0`}>
              <Icon name={tab.icon} className="text-base" />
            </div>
            <span className={`text-sm font-medium ${
              activeTab === tab.id
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'text-slate-700 dark:text-slate-300'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">
          Categories
        </h3>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Icon name={cat.icon} className="text-slate-600 dark:text-slate-400 text-lg flex-shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{cat.label}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 flex-shrink-0">
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Popular Searches */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">
          Popular Searches
        </h3>
        {['Road Closure', 'Water Crisis', 'Elections 2024', 'School Funding'].map((search) => (
          <button
            key={search}
            onClick={() => onSearchChange(search)}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all"
          >
            <div className="flex items-center gap-2">
              <Icon name="search" className="text-slate-400 text-sm" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{search}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
