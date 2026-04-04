import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/common';
import StandardLayout from '../layouts/StandardLayout';
import {
  DEFAULT_NOTIFICATION_STATE,
  getUnreadCount,
  readNotificationState,
  writeNotificationState,
} from '../utils/notificationState';

type NotificationFilter = 'all' | 'official' | 'mentions';

interface NotificationRecord {
  id: string;
  type: 'official_response' | 'status_update' | 'mention' | 'community';
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actor?: {
    name: string;
    avatar?: string;
  };
}

const notificationFilters: Array<{ id: NotificationFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'official', label: 'Official' },
  { id: 'mentions', label: 'Mentions' },
];

const initialNotifications: NotificationRecord[] = [
  {
    id: '1',
    type: 'official_response',
    title: 'Lagos State Ministry of Works replied to your report',
    body: 'The drainage work at Ikorodu Road has been scheduled for review next quarter.',
    timestamp: '2m ago',
    read: false,
    actionUrl: '/issue/1',
  },
  {
    id: '2',
    type: 'status_update',
    title: 'Your account was verified',
    body: 'Your account details have been confirmed. You can now post and send reports.',
    timestamp: '1h ago',
    read: false,
    actionUrl: '/settings',
  },
  {
    id: '3',
    type: 'mention',
    title: 'Amadi J. mentioned you',
    body: '"@Citizen_Abuja would have useful insight on this road project."',
    timestamp: '4h ago',
    read: true,
    actor: {
      name: 'Amadi J.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
    },
    actionUrl: '/feed',
  },
  {
    id: '4',
    type: 'community',
    title: 'A poll is closing soon',
    body: 'The minimum wage discussion in your area closes in 2 hours.',
    timestamp: 'Yesterday',
    read: true,
    actionUrl: '/feed',
  },
];

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');
  const [notifications, setNotifications] = useState<NotificationRecord[]>(() =>
    initialNotifications.map((item) => {
      const stored = readNotificationState(DEFAULT_NOTIFICATION_STATE).find(
        (storedItem) => storedItem.id === item.id,
      );

      return stored ? { ...item, read: stored.read } : item;
    }),
  );

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      if (activeFilter === 'official') {
        return item.type === 'official_response' || item.type === 'status_update';
      }
      if (activeFilter === 'mentions') {
        return item.type === 'mention';
      }
      return true;
    });
  }, [activeFilter, notifications]);

  const unreadCount = getUnreadCount(notifications);

  const markAllAsRead = () => {
    setNotifications((current) => {
      const next = current.map((item) => ({ ...item, read: true }));
      writeNotificationState(next);
      return next;
    });
  };

  const openNotification = (notification: NotificationRecord) => {
    setNotifications((current) => {
      const next = current.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item,
      );
      writeNotificationState(next);
      return next;
    });

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const getIcon = (type: NotificationRecord['type']) => {
    if (type === 'official_response') return 'account_balance';
    if (type === 'status_update') return 'verified_user';
    if (type === 'mention') return 'alternate_email';
    return 'notifications';
  };

  const getAccent = (type: NotificationRecord['type']) => {
    if (type === 'official_response') return 'var(--civic-primary)';
    if (type === 'status_update') return 'var(--civic-gold)';
    return 'var(--civic-border-strong)';
  };

  return (
    <StandardLayout showRightSidebar={false}>
      <div
        className="min-h-screen"
        style={{ background: 'linear-gradient(180deg, var(--civic-bg) 0%, var(--civic-bg-deep) 100%)' }}
      >
        <header className="glass-header sticky top-0 z-20 border-b" style={{ borderColor: 'var(--civic-border)' }}>
          <div className="px-4 py-4 lg:px-8">
            <div className="mx-auto max-w-[860px] space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--civic-text)]">Notifications</p>

                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="inline-flex min-h-10 items-center justify-center rounded-full px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--civic-primary)] transition disabled:opacity-45"
                  style={{ background: 'var(--civic-surface)', boxShadow: 'inset 0 0 0 1px var(--civic-border)' }}
                >
                  Mark all as read
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {notificationFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition ${
                      activeFilter === filter.id
                        ? 'rounded-full text-[var(--civic-text)]'
                        : 'text-[var(--civic-muted)] hover:text-[var(--civic-text)]'
                    }`}
                    style={
                      activeFilter === filter.id
                        ? { background: 'var(--civic-surface)', boxShadow: 'inset 0 0 0 1px var(--civic-border)' }
                        : undefined
                    }
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 py-6 lg:px-8">
          <div className="mx-auto max-w-[860px] space-y-4">
            {filteredNotifications.length ? (
              filteredNotifications.map((notification) => (
                <article
                  key={notification.id}
                  onClick={() => openNotification(notification)}
                  className="cursor-pointer rounded-md px-5 py-5 transition hover:-translate-y-0.5"
                  style={{
                    background: 'var(--civic-surface)',
                    boxShadow: notification.read
                      ? 'var(--civic-shadow-soft)'
                      : '0 18px 34px rgba(10,106,59,0.08)',
                  }}
                >
                  <div className="flex gap-4">
                    <div className="mt-1 h-auto w-1 shrink-0 rounded-full" style={{ background: getAccent(notification.type) }} />

                    {notification.actor?.avatar ? (
                      <img
                        src={notification.actor.avatar}
                        alt={notification.actor.name}
                        className="size-11 rounded-md object-cover"
                      />
                    ) : (
                      <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-md"
                        style={{ background: 'var(--civic-surface-strong)', color: 'var(--civic-primary)' }}
                      >
                        <Icon name={getIcon(notification.type)} className="text-[1.1rem]" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-base font-bold text-[var(--civic-text)]">{notification.title}</p>
                        <div className="flex items-center gap-2">
                          {!notification.read && <span className="size-2 rounded-full bg-[var(--civic-primary)]" />}
                          <span className="text-xs text-[var(--civic-muted)]">{notification.timestamp}</span>
                        </div>
                      </div>

                      <p className="mt-3 text-[15px] leading-7 text-[var(--civic-muted)]">{notification.body}</p>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-md px-6 py-10 text-center" style={{ background: 'var(--civic-surface)', boxShadow: 'var(--civic-shadow-soft)' }}>
                <p className="text-lg font-bold text-[var(--civic-text)]">No notifications here</p>
                <p className="mt-2 text-sm text-[var(--civic-muted)]">Try another tab or check again later.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
