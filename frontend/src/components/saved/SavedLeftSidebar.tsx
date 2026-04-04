import { Icon } from '../../components/common';

interface SavedLeftSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activeSortBy: string;
  onSortChange: (sort: string) => void;
}

export default function SavedLeftSidebar({
  activeFilter,
  onFilterChange,
  activeSortBy,
  onSortChange,
}: SavedLeftSidebarProps) {
  const filters = [
    {
      id: 'all',
      label: 'All Saved',
      icon: 'bookmark',
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'issues',
      label: 'Issues',
      icon: 'report',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: 'article',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      id: 'updates',
      label: 'Updates',
      icon: 'update',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'mostViewed', label: 'Most Viewed' },
    { id: 'mostLiked', label: 'Most Liked' },
  ];

  const collections = [
    { id: '1', name: 'Infrastructure Issues', count: 24 },
    { id: '2', name: 'Environmental Concerns', count: 18 },
    { id: '3', name: 'Policy Updates', count: 12 },
    { id: '4', name: 'Community Events', count: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Saved Items</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Your bookmarked content</p>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              activeFilter === filter.id
                ? 'bg-primary/15 border border-primary/50'
                : 'hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
            }`}
          >
            <div className={`${filter.color} p-2 rounded-md flex items-center justify-center flex-shrink-0`}>
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

      {/* Sort By */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">
          Sort By
        </h3>
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSortChange(option.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              activeSortBy === option.id
                ? 'bg-primary/10 border border-primary/50 text-primary'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
            }`}
          >
            {activeSortBy === option.id && (
              <Icon name="check" className="text-primary flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Collections */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Collections
          </h3>
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-navy-800">
            <Icon name="add" className="text-primary" />
          </button>
        </div>
        {collections.map((collection) => (
          <button
            key={collection.id}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Icon name="folder" className="text-slate-600 dark:text-slate-400 flex-shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                {collection.name}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 flex-shrink-0">
              {collection.count}
            </span>
          </button>
        ))}
      </div>

      {/* Manage Saved */}
      <button className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 justify-center">
        <Icon name="edit" className="text-lg" />
        Manage Collections
      </button>
    </div>
  );
}
