import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Transfer from "./pages/transfer";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Service from "./pages/service";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/gift-cards" element={<Service />} />
      <Route path="/crypto" element={<Service />} />
      <Route path="/airtime" element={<Service />} />
      <Route path="/data" element={<Service />} />
      <Route path="/electricity" element={<Service />} />
      <Route path="/tv" element={<Service />} />
      <Route path="/betting" element={<Service />} />
      <Route path="/dollar-cards" element={<Service />} />
      <Route path="/:id" element={<Service />} />
    </Routes>
  );
}
