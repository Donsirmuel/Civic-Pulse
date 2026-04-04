import { Icon } from '../../components/common';

interface TimelineLeftSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  stats?: {
    trending: number;
    issues: number;
    updates: number;
  };
}

export default function TimelineLeftSidebar({
  activeFilter,
  onFilterChange,
  stats = { trending: 0, issues: 0, updates: 0 },
}: TimelineLeftSidebarProps) {
  const filterGroups = [
    {
      title: 'Feed Type',
      filters: [
        { id: 'all', label: 'All Feed', icon: 'home', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
        { id: 'issues', label: 'Issues', icon: 'report', color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
        { id: 'officials', label: 'Officials', icon: 'verified', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
      ],
    },
    {
      title: 'Geographic Scope',
      filters: [
        { id: 'local', label: 'Local', icon: 'location_on', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
        { id: 'state', label: 'State', icon: 'apartment', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
        { id: 'national', label: 'National', icon: 'flag', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Filters</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Customize your feed</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2">
            <Icon name="trending_up" className="text-blue-600 dark:text-blue-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Trending</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.trending}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-3 border border-red-200 dark:border-red-700">
          <div className="flex items-center gap-2">
            <Icon name="report" className="text-red-600 dark:text-red-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Issues</p>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{stats.issues}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2">
            <Icon name="update" className="text-green-600 dark:text-green-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Updates</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.updates}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">
            {group.title}
          </h3>
          <div className="space-y-2">
            {group.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary/20 border border-primary/50'
                    : 'hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
                }`}
              >
                <div className={`${filter.color} p-2 rounded-md flex items-center justify-center`}>
                  <Icon name={filter.icon} className="text-base" />
                </div>
                <span className={`text-sm font-medium ${
                  activeFilter === filter.id
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {filter.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">
          Quick Actions
        </h3>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all text-slate-700 dark:text-slate-300">
          <Icon name="bookmark" className="text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-medium">Saved Posts</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all text-slate-700 dark:text-slate-300">
          <Icon name="schedule" className="text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-medium">Recent</span>
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-slate-100 dark:bg-navy-800/50 rounded-lg p-3 space-y-2 border border-slate-200 dark:border-navy-700">
        <p className="text-xs font-semibold text-slate-900 dark:text-white">Need help?</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Use filters to find issues and updates relevant to your area.
        </p>
      </div>
    </div>
  );
}
