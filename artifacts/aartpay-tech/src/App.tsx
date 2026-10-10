import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Transfer from "./pages/transfer";
import Service from "./pages/service";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Crypto from "./pages/crypto";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/crypto" element={<Crypto />} />
      {/* THIS ONE MAKE ALL 11 CARDS WORK */}
      <Route path="/:id" element={<Service />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
