import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import CryptoEscrow from "./pages/crypto";
import NotFound from "./pages/not-found";

function RoutesComp() {
  const [location, setLocation] = useLocation();
  useEffect(() => {
    if (location === "/") {
      const isLoggedIn = localStorage.getItem("aartpay_is_logged_in");
      if (isLoggedIn === "true") {
        setLocation("/dashboard");
      } else {
        setLocation("/signin");
      }
    }
  }, [location, setLocation]);
  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/crypto" component={CryptoEscrow} />
      <Route component={NotFound} />
    </Switch>
  );
}
export default function App() { return <RoutesComp />; }
