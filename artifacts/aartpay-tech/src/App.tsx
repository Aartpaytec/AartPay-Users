import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import {
  getGetApiHomeQueryKey,
  getHealthCheckQueryKey,
  getListUsersQueryKey,
  useGetApiHome,
  useHealthCheck,
  useListUsers,
  useRegisterUser,
} from '@workspace/api-client-react';
import { ArrowUpRight, Check, CircleAlert, LockKeyhole, Plus, RefreshCw, ShieldCheck, UsersRound, WalletCards } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const client = useQueryClient();
  const home = useGetApiHome({ query: { queryKey: getGetApiHomeQueryKey() } });
  const health = useHealthCheck({
    query: { queryKey: getHealthCheckQueryKey(), refetchInterval: 30000 },
  });
  const users = useListUsers({ query: { queryKey: getListUsersQueryKey() } });
  const registerUser = useRegisterUser();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const healthStatus = health.data?.status?.toLowerCase();
  const isHealthy = healthStatus === 'ok' || healthStatus === 'healthy' || healthStatus === 'up';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    setSuccessMessage('');
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName || !cleanPhone) {
      setFormError('Enter a name and phone number to continue.');
      return;
    }

    registerUser.mutate(
      { data: { name: cleanName, phone: cleanPhone } },
      {
        onSuccess: (user) => {
          void client.invalidateQueries({ queryKey: getListUsersQueryKey() });
          setName('');
          setPhone('');
          setSuccessMessage(`${user.name} is registered with a starting balance of ${formatBalance(user.balance)}.`);
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : 'Registration could not be completed.';
          setFormError(message);
        },
      },
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="AartPay Tech">
          <span className="brand-mark"><WalletCards size={19} strokeWidth={1.8} /></span>
          <span>AartPay <span style={{ fontWeight: 500 }}>Tech</span></span>
        </div>
        <div className="top-status" data-testid="status-api">
          <span className={`status-lamp ${health.isError ? 'offline' : health.isLoading ? '' : isHealthy ? 'online' : 'offline'}`} />
          {health.isLoading ? 'Checking API' : health.isError ? 'API unavailable' : `API ${health.data?.status ?? 'status unknown'}`}
        </div>
      </header>

      <div className="workspace">
        <section className="intro">
          <p className="eyebrow">People, with a good start</p>
          <h1>A small first step.<br />A steadier way forward.</h1>
          <p className="intro-copy">
            Bring someone into AartPay and give them a clear place to begin. Every new wallet starts at zero, ready for what comes next.
          </p>
        </section>

        <div className="content-grid">
          <section className="panel register-panel" aria-labelledby="register-heading">
            <div className="panel-head">
              <div>
                <p className="panel-kicker">New account</p>
                <h2 className="panel-title" id="register-heading">Register a person</h2>
                <p className="panel-description">Just the essentials to get started.</p>
              </div>
              <span className="state-symbol" style={{ width: 36, height: 36, margin: 0, borderRadius: 11 }}>
                <Plus size={18} />
              </span>
            </div>
            <form className="register-form" onSubmit={handleSubmit} noValidate>
              <label className="field">
                <span className="field-label">Full name</span>
                <input
                  autoComplete="name"
                  data-testid="input-name"
                  name="name"
                  placeholder="e.g. Amara Okafor"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label className="field">
                <span className="field-label">Phone number</span>
                <input
                  autoComplete="tel"
                  data-testid="input-phone"
                  name="phone"
                  placeholder="e.g. +234 801 234 5678"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </label>
              {formError && <p className="form-error" role="alert" data-testid="text-registration-error">{formError}</p>}
              {successMessage && <p className="form-error" style={{ color: '#426e56' }} role="status" data-testid="text-registration-success">{successMessage}</p>}
              <button className="submit-button" data-testid="button-register" type="submit" disabled={registerUser.isPending}>
                {registerUser.isPending ? (
                  <><RefreshCw size={15} className="animate-spin" /> Adding person…</>
                ) : (
                  <>Add person <ArrowUpRight size={16} /></>
                )}
              </button>
              <p className="form-note"><LockKeyhole size={12} /> Details are used only to create their AartPay profile.</p>
            </form>
            {!home.isError && (
              <div className="welcome-strip" data-testid="text-home-message">
                <ShieldCheck size={15} />
                <span>{home.isLoading ? 'Connecting to AartPay…' : home.data?.message || 'AartPay is ready when you are.'}</span>
              </div>
            )}
            {home.isError && (
              <div className="welcome-strip" role="status">
                <CircleAlert size={15} />
                <span>Welcome message is temporarily unavailable.</span>
              </div>
            )}
          </section>

          <section className="panel users-panel" aria-labelledby="people-heading">
            <div className="panel-head">
              <div>
                <p className="panel-kicker">Your people</p>
                <h2 className="panel-title" id="people-heading">Registered users</h2>
                <p className="panel-description">Current profiles and their starting balance.</p>
              </div>
              <span className="user-count" data-testid="text-user-count">
                {users.isLoading ? '—' : users.data?.length ?? 0}
              </span>
            </div>

            {users.isLoading ? (
              <div className="table-state" aria-label="Loading registered users">
                <div style={{ display: 'grid', gap: 13, width: '100%', maxWidth: 390, margin: '0 auto' }}>
                  <div className="skeleton-line" style={{ width: '35%' }} />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" style={{ width: '78%' }} />
                </div>
              </div>
            ) : users.isError ? (
              <div className="table-state" role="alert" data-testid="status-users-error">
                <span className="state-symbol"><CircleAlert size={19} /></span>
                <h3>We couldn’t load your people</h3>
                <p>There was a problem reaching the user list. Try again in a moment.</p>
                <button className="retry-button" data-testid="button-retry-users" type="button" onClick={() => void users.refetch()}>
                  <RefreshCw size={13} /> Try again
                </button>
              </div>
            ) : users.data?.length ? (
              <div className="table-wrap">
                <table className="user-table">
                  <thead>
                    <tr><th scope="col">Person</th><th scope="col">Starting balance</th><th scope="col">API status</th></tr>
                  </thead>
                  <tbody>
                    {users.data.map((user, index) => (
                      <tr key={`${user.phone}-${index}`} data-testid={`row-user-${index}`}>
                        <td>
                          <div className="person-cell" data-testid={`text-user-${index}`}>
                            <span className="person-initial">{getInitials(user.name)}</span>
                            <span>
                              <span className="person-name">{user.name}</span>
                              <span className="person-phone">{user.phone}</span>
                            </span>
                          </div>
                        </td>
                        <td className="balance-value" data-testid={`text-balance-${index}`}>{formatBalance(user.balance)}</td>
                        <td data-testid={`status-user-api-${index}`}>
                          <span className="api-pill">{health.isLoading ? 'Checking' : health.isError ? 'Unavailable' : health.data?.status ?? 'Unknown'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-state" data-testid="empty-users">
                <span className="state-symbol"><UsersRound size={19} /></span>
                <h3>A good place to begin</h3>
                <p>No one has been registered yet. Add the first person using the form and they’ll appear here.</p>
              </div>
            )}
          </section>
        </div>
      </div>
      <footer className="footer-note">
        <span>AARTPAY TECH · PEOPLE FIRST</span>
        <span>Starting balances are set by the AartPay API</span>
      </footer>
    </main>
  );
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('');
}

function formatBalance(balance: number) {
  return Number.isFinite(balance)
    ? balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '—';
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
