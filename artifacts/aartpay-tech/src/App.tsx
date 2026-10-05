import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import Signup from '@/pages/signup';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip-provider';
import { useState } from 'react';

const queryClient = new QueryClient();

function Home() {
  const [, setLocation] = useLocation();
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'white', padding: 40, borderRadius: 16, maxWidth: 500, width: '100%', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>AartPay</h1>
        <p style={{ color: '#666', marginBottom: 30 }}>Fast, secure payments for everyone</p>
        <button onClick={() => setLocation('/signup')} style={{ width: '100%', padding: 14, background: 'black', color: 'white', borderRadius: 10, fontWeight: 'bold', border: 'none' }}>
          Create Account - Sign Up
        </button>
        <p style={{ marginTop: 20, fontSize: 14 }}>
          Already have account? <span onClick={() => setLocation('/signup')} style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Sign up here</span>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
