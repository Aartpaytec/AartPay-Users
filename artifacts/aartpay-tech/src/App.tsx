import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import Signup from "@/pages/signup";
import Signin from "@/pages/signin";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip-provider";

const queryClient = new QueryClient();

function Home() {
  const [, setLocation] = useLocation();
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: 40, borderRadius: 16, maxWidth: 400, width: "90%", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 10 }}>AartPay</h1>
        <p style={{ color: "#666", marginBottom: 30 }}>Fast, secure payments for everyone.</p>
        
        <button 
          onClick={() => setLocation('/signup')} 
          style={{ width: "100%", padding: 14, background: "black", color: "white", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "600", cursor: "pointer" }}
        >
          Create Account - Sign Up
        </button>

        <p style={{ marginTop: 20, fontSize: 14 }}>
          Already have account? <span onClick={() => setLocation('/signin')} style={{ color: "blue", textDecoration: "underline", cursor: "pointer", fontWeight: "600" }}>Sign in</span>
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
            <Route path="/signin" component={Signin} />
            <Route path="/login" component={Signin
