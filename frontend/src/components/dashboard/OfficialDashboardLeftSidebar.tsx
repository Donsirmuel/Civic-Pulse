import { Icon } from '../../components/common';

interface OfficialDashboardLeftSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function OfficialDashboardLeftSidebar({
  activeSection,
  onSectionChange,
}: OfficialDashboardLeftSidebarProps) {
  const sections = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'dashboard',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      description: 'Dashboard stats',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'analytics',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      description: 'Performance metrics',
    },
    {
      id: 'posts',
      label: 'Posts & Updates',
      icon: 'article',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      description: 'Manage content',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'mail',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      description: 'Communications',
    },
    {
      id: 'issues',
      label: 'Issues',
      icon: 'report',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      description: 'Reported issues',
    },
    {
      id: 'team',
      label: 'Team',
      icon: 'group',
      color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
      description: 'Manage team members',
    },
  ];

  const quickStats = [
    { label: 'Total Posts', value: '342', change: '+12 this week' },
    { label: 'Engagement Rate', value: '8.4%', change: '+0.5% vs last week' },
    { label: 'Active Issues', value: '24', change: '-3 resolved' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Dashboard</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage your official presence</p>
      </div>

      {/* Quick Stats */}
      <div className="space-y-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className="px-3 py-3 rounded-lg bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Sections */}
      <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1 mb-2">Sections</h3>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-primary/15 border border-primary/50'
                : 'hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
            }`}
          >
            <div className={`${section.color} p-2 rounded-md flex items-center justify-center flex-shrink-0`}>
              <Icon name={section.icon} className="text-base" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                activeSection === section.id
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {section.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{section.description}</p>
            </div>
            {activeSection === section.id && (
              <Icon name="chevron_right" className="text-primary text-lg flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-1 mb-2">Actions</h3>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all font-medium text-sm">
          <Icon name="add" className="text-lg" />
          New Post
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 transition-all text-slate-700 dark:text-slate-300 font-medium text-sm">
          <Icon name="schedule" className="text-lg" />
          Schedule Post
        </button>
      </div>

      {/* Help & Support */}
      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 space-y-2 border border-blue-200 dark:border-blue-700">
        <div className="flex gap-2">
          <Icon name="help" className="text-blue-600 dark:text-blue-400 text-lg flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">Need help?</p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Check our dashboard guide for tips and best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
