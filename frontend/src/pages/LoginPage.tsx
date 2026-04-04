import { useState, type FormEvent } from 'react';
import type { CredentialResponse } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo, Icon } from '../components/common';
import { authService } from '../services';

const authStats = [
  { value: '12.4M', label: 'Active citizens' },
  { value: '98.2%', label: 'Reply rate' },
  { value: '24/7', label: 'Live access' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login({ username, password });
      navigate('/feed');
    } catch (err) {
      console.error('Login error:', err);
      setError('We could not sign you in. Check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError('Google sign-in did not return a valid credential.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.googleAuth(credentialResponse.credential);
      navigate('/feed');
    } catch (err) {
      console.error('Google auth error:', err);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-5 py-5 text-[var(--civic-text)] sm:px-8 lg:px-10">
      <div
        className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-[1400px] overflow-hidden rounded-md"
        style={{ background: 'var(--civic-surface)', boxShadow: 'var(--civic-shadow)' }}
      >
        <div className="hidden lg:grid lg:grid-cols-[1.15fr_0.85fr]">
          <section
            className="civic-auth-hero relative flex flex-col justify-between overflow-hidden px-12 py-10"
            style={{ background: 'linear-gradient(180deg, var(--civic-bg) 0%, var(--civic-surface-muted) 100%)' }}
          >
            <div className="absolute inset-0 bg-pattern opacity-30" />
            <div className="civic-auth-grid" />
            <div className="civic-auth-rings" />
            <div className="civic-auth-beam" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <Logo size="sm" linkTo={null} subtitle="Community First" />
                <div className="flex items-center gap-2 text-[var(--civic-muted)]">
                  <Icon name="location_on" className="text-[18px]" />
                  <Icon name="notifications" className="text-[18px]" />
                  <Icon name="account_circle" className="text-[18px]" />
                </div>
              </div>

              <div className="mt-24 max-w-2xl">
                <span className="civic-chip-active">Live platform access</span>
                <h1 className="mt-6 text-6xl font-black leading-[0.95] tracking-[-0.06em] text-[var(--civic-text-strong)]">
                  Follow local issues, official replies, and community updates in one place.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--civic-muted)]">
                  Sign in to track reports, join discussions, and keep up with what is happening around you.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-16 grid grid-cols-3 gap-4">
              {authStats.map((item) => (
                <div key={item.label} className="rounded-md px-4 py-5" style={{ background: 'var(--civic-surface)', boxShadow: 'inset 0 0 0 1px var(--civic-border)' }}>
                  <p className="text-4xl font-black tracking-[-0.05em] text-[var(--civic-text)]">{item.value}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--civic-muted)]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-8 max-w-[420px] self-end">
              <div className="civic-auth-float-card">
                <p className="civic-label">Live signal</p>
                <p className="mt-3 text-base font-bold text-[var(--civic-text)]">
                  People can report, follow replies, and stay close to local updates in one place.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[var(--civic-primary)]">
                  <span className="size-2 rounded-full bg-[var(--civic-primary)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">Always on</span>
                </div>
              </div>
            </div>
          </section>

          <section
            className="flex items-center justify-center px-10 py-10"
            style={{ background: 'var(--civic-surface-soft)' }}
          >
            <div className="w-full max-w-[430px]">
              <div
                className="rounded-md px-6 py-6"
                style={{ background: 'var(--civic-surface-strong)', boxShadow: 'inset 0 0 0 1px var(--civic-ghost-border)' }}
              >
                <div className="grid grid-cols-2 gap-2 rounded-full p-1" style={{ background: 'var(--civic-surface-inset)' }}>
                  <Link
                    to="/register"
                    className="inline-flex min-h-11 items-center justify-center rounded-full text-sm font-semibold text-[var(--civic-muted)] transition hover:text-[var(--civic-text)]"
                  >
                    Create Account
                  </Link>
                  <div className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--civic-primary)_0%,var(--civic-primary-deep)_100%)] text-sm font-semibold text-[var(--civic-primary-contrast)]">
                    Login
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--civic-muted)]">
                    Access your account
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--civic-text)]">
                    Welcome back
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <Input
                    label="Username"
                    name="username"
                    icon="alternate_email"
                    placeholder="@yourname"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />

                  <Input
                    label="Password"
                    type="password"
                    icon="lock"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />

                  {error && (
                    <div className="rounded-md bg-[rgba(218,92,78,0.1)] px-4 py-3 text-sm text-[var(--civic-danger)]">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[12px] text-[var(--civic-muted)]">
                    <span>Keep me signed in</span>
                    <span>Secure access</span>
                  </div>

                  <Button type="submit" size="lg" fullWidth loading={loading} icon="arrow_forward">
                    Sign In
                  </Button>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1" style={{ background: 'var(--civic-border)' }} />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--civic-muted)]">
                        Continue with
                      </span>
                      <div className="h-px flex-1" style={{ background: 'var(--civic-border)' }} />
                    </div>

                    <div className="flex justify-center">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google sign-in failed. Please try again.')}
                        text="continue_with"
                        shape="rectangular"
                        theme="outline"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:hidden">
          <div className="px-5 py-8" style={{ background: 'var(--civic-surface-soft)' }}>
            <div className="flex justify-center">
              <Logo size="md" linkTo={null} subtitle="Community First" />
            </div>

            <div className="mt-8 rounded-md p-5" style={{ background: 'var(--civic-surface)', boxShadow: 'var(--civic-shadow-soft)' }}>
              <div className="grid grid-cols-2 gap-2 rounded-full p-1" style={{ background: 'var(--civic-surface-inset)' }}>
                <Link
                  to="/register"
                  className="inline-flex min-h-11 items-center justify-center rounded-full text-sm font-semibold text-[var(--civic-muted)]"
                >
                  Create Account
                </Link>
                <div className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--civic-primary)_0%,var(--civic-primary-deep)_100%)] text-sm font-semibold text-[var(--civic-primary-contrast)]">
                  Login
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Input
                  label="Username"
                  name="username"
                  icon="alternate_email"
                  placeholder="@yourname"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  icon="lock"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                {error && (
                  <div className="rounded-md bg-[rgba(218,92,78,0.1)] px-4 py-3 text-sm text-[var(--civic-danger)]">
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" fullWidth loading={loading} icon="arrow_forward">
                  Sign In
                </Button>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google sign-in failed. Please try again.')}
                    text="continue_with"
                    shape="rectangular"
                    theme="outline"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
