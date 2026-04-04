import { Icon } from '../../components/common';

interface SettingsLeftSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function SettingsLeftSidebar({
  activeSection,
  onSectionChange,
}: SettingsLeftSidebarProps) {
  const sections = [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: 'palette',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      description: 'Theme & display',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'notifications',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      description: 'Email & alerts',
    },
    {
      id: 'account',
      label: 'Account',
      icon: 'person',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      description: 'Profile & settings',
    },
    {
      id: 'privacy',
      label: 'Privacy & Safety',
      icon: 'security',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      description: 'Control your data',
    },
    {
      id: 'sessions',
      label: 'Active Sessions',
      icon: 'devices',
      color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
      description: 'Manage devices',
    },
    {
      id: 'activity',
      label: 'Activity Log',
      icon: 'history',
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      description: 'View history',
    },
  ];

  const dangerSections = [
    {
      id: 'danger',
      label: 'Danger Zone',
      icon: 'warning',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      description: 'Account actions',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Settings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage your preferences</p>
      </div>

      {/* Main Settings Sections */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase px-1">
          Main Settings
        </h3>
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

      {/* Danger Zone */}
      <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-navy-700">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase px-1">
          Account Actions
        </h3>
        {dangerSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                : 'hover:bg-red-50 dark:hover:bg-red-900/10 border border-transparent'
            }`}
          >
            <div className={`${section.color} p-2 rounded-md flex items-center justify-center flex-shrink-0`}>
              <Icon name={section.icon} className="text-base" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                activeSection === section.id
                  ? 'text-red-700 dark:text-red-400 font-semibold'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {section.label}
              </p>
              <p className="text-xs text-red-500 dark:text-red-500/70">{section.description}</p>
            </div>
            {activeSection === section.id && (
              <Icon name="chevron_right" className="text-red-600 dark:text-red-400 text-lg flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 space-y-2 border border-blue-200 dark:border-blue-700">
        <div className="flex gap-2">
          <Icon name="info" className="text-blue-600 dark:text-blue-400 text-lg flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">Tip</p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Click on any setting to view and modify it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
