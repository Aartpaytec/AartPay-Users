import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Signup from "@/pages/signup";
import Signin from "@/pages/signin";

const queryClient = new QueryClient();

function AartPayHomepage() {
  const [, setLocation] = useLocation();
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", padding: 40, borderRadius: 16, textAlign: "center", maxWidth: 400, width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: 36, fontWeight: "bold", marginBottom: 10 }}>AartPay</h1>
        <p style={{ color: "#666", marginBottom: 30 }}>Fast, secure payments for everyone.</p>
        <button onClick={() => setLocation("/signup")} style={{ width: "100%", padding: 16, background: "black", color: "white", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "600", cursor: "pointer", marginBottom: 16 }}>
          Create Account - Sign Up
        </button>
        <p style={{ fontSize: 14 }}>Already have account? <span onClick={() => setLocation("/signin")} style={{ color: "blue", textDecoration: "underline", cursor: "pointer", fontWeight: "600" }}>Sign in</span></p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={AartPayHomepage} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
