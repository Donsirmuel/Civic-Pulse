import { Icon } from '../../components/common';

interface NotificationsLeftSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  unreadCount?: {
    mentions: number;
    replies: number;
    likes: number;
    follows: number;
  };
}

export default function NotificationsLeftSidebar({
  activeFilter,
  onFilterChange,
  unreadCount = { mentions: 0, replies: 0, likes: 0, follows: 0 },
}: NotificationsLeftSidebarProps) {
  const filters = [
    {
      id: 'all',
      label: 'All Notifications',
      icon: 'notifications',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      count: Object.values(unreadCount).reduce((a, b) => a + b, 0),
    },
    {
      id: 'mentions',
      label: 'Mentions',
      icon: 'at',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      count: unreadCount.mentions,
    },
    {
      id: 'replies',
      label: 'Replies',
      icon: 'chat',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      count: unreadCount.replies,
    },
    {
      id: 'likes',
      label: 'Likes',
      icon: 'favorite',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      count: unreadCount.likes,
    },
    {
      id: 'follows',
      label: 'Follows',
      icon: 'person_add',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      count: unreadCount.follows,
    },
  ];

  const notificationTypes = [
    { id: 'issues', label: 'New Issues', icon: 'report', enabled: true },
    { id: 'comments', label: 'Comments', icon: 'chat_bubble', enabled: true },
    { id: 'updates', label: 'Updates', icon: 'update', enabled: true },
    { id: 'official', label: 'Official Responses', icon: 'verified', enabled: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Notifications</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Stay updated</p>
      </div>

      {/* Notification Filters */}
      <div className="space-y-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
              activeFilter === filter.id
                ? 'bg-primary/15 border border-primary/50'
                : 'hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
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
            </div>
            {filter.count > 0 && (
              <span className="ml-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification Types */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1">
          Notification Types
        </h3>
        {notificationTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-3">
              <Icon name={type.icon} className="text-slate-600 dark:text-slate-400 text-lg" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{type.label}</span>
            </div>
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-navy-800">
              <Icon name={type.enabled ? 'check_circle' : 'radio_button_unchecked'}
                className={type.enabled ? 'text-primary' : 'text-slate-400'} />
            </button>
          </div>
        ))}
      </div>

      {/* Mark as Read */}
      <button className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 transition-all text-sm font-medium text-slate-700 dark:text-slate-300">
        Mark All as Read
      </button>
    </div>
  );
}
