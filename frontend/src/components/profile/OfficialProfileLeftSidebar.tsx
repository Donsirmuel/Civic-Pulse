import { Icon } from '../../components/common';

interface OfficialProfileLeftSidebarProps {
  isFollowing: boolean;
  onFollowToggle: () => void;
  onMessage: () => void;
  postsFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function OfficialProfileLeftSidebar({
  isFollowing,
  onFollowToggle,
  onMessage,
  postsFilter,
  onFilterChange,
}: OfficialProfileLeftSidebarProps) {
  const filters = [
    { id: 'all', label: 'All Posts', icon: 'article' },
    { id: 'announcements', label: 'Announcements', icon: 'campaign' },
    { id: 'updates', label: 'Updates', icon: 'update' },
    { id: 'responses', label: 'Responses', icon: 'chat' },
  ];

  const stats = [
    { label: 'Followers', value: '15.2K', icon: 'people' },
    { label: 'Posts', value: '342', icon: 'article' },
    { label: 'Engagement', value: '94%', icon: 'trending_up' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="space-y-3">
        <button
          onClick={onFollowToggle}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
            isFollowing
              ? 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          <Icon name={isFollowing ? 'check' : 'add'} className="text-lg" />
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        <button
          onClick={onMessage}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700 font-semibold transition-all"
        >
          <Icon name="mail" className="text-lg" />
          Message
        </button>
      </div>

      {/* Stats */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">Stats</h3>
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700">
            <Icon name={stat.icon} className="text-primary text-xl flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Posts Filter */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">Filter Posts</h3>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              postsFilter === filter.id
                ? 'bg-primary/15 border border-primary/50'
                : 'hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
            }`}
          >
            <Icon name={filter.icon} className={`${
              postsFilter === filter.id ? 'text-primary' : 'text-slate-600 dark:text-slate-400'
            }`} />
            <span className={`text-sm font-medium ${
              postsFilter === filter.id
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'text-slate-700 dark:text-slate-300'
            }`}>
              {filter.label}
            </span>
          </button>
        ))}
      </div>

      {/* About Section */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">Position</h3>
        <div className="px-3 py-3 rounded-lg bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Mayor</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">City of Springfield</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Since 2022</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-navy-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all text-slate-700 dark:text-slate-300">
          <Icon name="location_on" className="text-slate-600 dark:text-slate-400" />
          <span className="text-sm">Springfield, IL</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all text-slate-700 dark:text-slate-300">
          <Icon name="language" className="text-slate-600 dark:text-slate-400" />
          <span className="text-sm">mayor.springfield.gov</span>
        </button>
      </div>
    </div>
  );
}
