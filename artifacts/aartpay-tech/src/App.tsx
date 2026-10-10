import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Transfer from "./pages/transfer";
import Escrow from "./pages/escrow";
import EscrowChat from "./pages/escrow-chat";
import Service from "./pages/service";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/escrow-chat" element={<EscrowChat />} />
        {/* ONE ROUTE - MAKES ALL CARDS WORK */}
        <Route path="/:id" element={<Service />} />
      </Routes>
    </BrowserRouter>
  );
}
