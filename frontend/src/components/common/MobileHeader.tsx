import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Logo } from './';
import { authService } from '../../services';

export default function MobileHeader() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { icon: 'home', label: 'Home', path: '/feed' },
    { icon: 'mail', label: 'Messages', path: '/messages' },
    { icon: 'notifications', label: 'Notifications', path: '/notifications' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
    { icon: 'logout', label: 'Log Out', path: '/login', logout: true },
  ];

  return (
    <>
      <header
        className="glass-header sticky top-0 z-40 border-b lg:hidden"
        style={{ borderColor: 'var(--civic-border)' }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Logo size="sm" showTagline={false} />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => navigate('/notifications')}
              className="civic-icon-button size-10"
            >
              <Icon name="notifications" className="text-xl" />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="civic-icon-button size-10"
              style={{ color: 'var(--civic-muted)' }}
            >
              <Icon name="menu" className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'var(--civic-overlay)' }} onClick={() => setShowMenu(false)} />
          <div
            className="fixed right-0 top-0 bottom-0 z-50 w-72 shadow-[0_24px_48px_rgba(22,33,51,0.14)] ring-1 lg:hidden"
            style={{ background: 'var(--civic-surface)', borderColor: 'var(--civic-border)' }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-4 py-4" style={{ borderColor: 'var(--civic-border)' }}>
                <p className="text-lg font-black tracking-[-0.03em] text-[var(--civic-text)]">Menu</p>
                <button onClick={() => setShowMenu(false)} className="p-2 text-[var(--civic-muted)]">
                  <Icon name="close" className="text-xl" />
                </button>
              </div>

              <Link
                to="/profile"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 border-b px-4 py-4"
                style={{ borderColor: 'var(--civic-border)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="size-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-[var(--civic-text)]">Profile</p>
                  <p className="mt-1 text-[11px] text-[var(--civic-muted)]">@citizen</p>
                </div>
              </Link>

              <nav className="flex-1 py-2">
                {menuItems.map((item) => (
                  item.logout ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        authService.logout();
                        setShowMenu(false);
                        navigate('/login');
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-[var(--civic-muted)] transition hover:text-[var(--civic-text)]"
                    >
                      <Icon name={item.icon} className="text-xl" />
                      <span className="text-sm font-bold">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-[var(--civic-muted)] transition hover:text-[var(--civic-text)]"
                    >
                      <Icon name={item.icon} className="text-xl" />
                      <span className="text-sm font-bold">{item.label}</span>
                    </Link>
                  )
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
