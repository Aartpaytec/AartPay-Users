import { Switch, Route, useLocation } from "wouter";
import Signup from "@/pages/signup";
import Signin from "@/pages/signin";

function Home() {
  const [, setLocation] = useLocation();
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F7", padding: 20 }}>
      <div style={{ background: "white", padding: 40, borderRadius: 16, textAlign: "center", maxWidth: 400, width: "100%" }}>
        <h1 style={{ fontSize: 36, fontWeight: "bold" }}>AartPay</h1>
        <p style={{ color: "#666", marginBottom: 30 }}>Fast, secure payments</p>
        <button onClick={() => setLocation("/signup")} style={{ width: "100%", padding: 16, background: "black", color: "white", borderRadius: 8, border: "none", fontWeight: "600" }}>Create Account - Sign Up</button>
        <p style={{ marginTop: 16, fontSize: 14 }}>Already have account? <span onClick={() => setLocation("/signin")} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Sign in</span></p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
