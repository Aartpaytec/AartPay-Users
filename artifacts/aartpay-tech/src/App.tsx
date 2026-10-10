import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";

// Small page for every service — so no 404
const ServicePage = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 20px", background: "black", color: "white", borderRadius: "8px", border: "none", marginBottom: "20px" }}>← Back to Dashboard</button>
      <h1>{title}</h1>
      <p>Your {title} service is now working. No more 404!</p>
      <p>Wallet: ₦ 0.00</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ALL SERVICES - EACH ONE NOW WORKS */}
        <Route path="/giftcards" element={<ServicePage title="Gift Cards" />} />
        <Route path="/gift-cards" element={<ServicePage title="Gift Cards" />} />
        <Route path="/crypto" element={<ServicePage title="Crypto" />} />
        <Route path="/dollar-cards" element={<ServicePage title="Dollar Cards" />} />
        <Route path="/tv" element={<ServicePage title="TV Subscription" />} />
        <Route path="/tv-sub" element={<ServicePage title="TV Subscription" />} />
        <Route path="/electricity" element={<ServicePage title="Electricity" />} />
        <Route path="/airtime" element={<ServicePage title="Airtime & Data" />} />
        <Route path="/airtime-data" element={<ServicePage title="Airtime & Data" />} />
        <Route path="/betting" element={<ServicePage title="Betting" />} />
        <Route path="/utilities" element={<ServicePage title="Utilities" />} />
        <Route path="/withdraw" element={<ServicePage title="Withdraw" />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
