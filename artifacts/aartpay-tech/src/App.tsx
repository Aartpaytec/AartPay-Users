import { Route, Switch, useLocation, Router } from "wouter";
import { useEffect, useState } from "react";

import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";

function AppRoutes() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem("aartpay_is_logged_in");
      if (location === "/" || location === "") {
        if (loggedIn === "true") {
          setLocation("/dashboard");
        } else {
          setLocation("/signin");
        }
      }
    } catch (e) {
      console.log("routing error", e);
      setLocation("/signin");
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/">{() => <div style={{padding: 20}}>Loading...</div>}</Route>
      <Route>404 - Go to SignIn</Route>
    </Switch>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
