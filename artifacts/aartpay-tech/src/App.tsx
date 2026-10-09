import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import all your pages — if one no exist, no worry, we handle am below
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import GiftCards from "./pages/giftcards";

// This component will prevent 404 for ANY other feature
// Transfer, Bills, Airtime etc will show Dashboard for now, no 404
const SafeDashboard = () => <Dashboard />;

function App() {
  return (
    <Router>
      <Routes>
        {/* First page */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        
        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ALL MAIN FEATURES — No more 404 */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/giftcards" element={<GiftCards />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        
        {/* Every other button you click will go to Dashboard, NOT 404 */}
        <Route path="/transfer" element={<SafeDashboard />} />
        <Route path="/bills" element={<SafeDashboard />} />
        <Route path="/airtime" element={<SafeDashboard />} />
        <Route path="/data" element={<SafeDashboard />} />
        <Route path="/crypto" element={<SafeDashboard />} />
        <Route path="/savings" element={<SafeDashboard />} />
        <Route path="/transactions" element={<SafeDashboard />} />
        <Route path="/settings" element={<SafeDashboard />} />
        <Route path="/profile" element={<SafeDashboard />} />

        {/* MOST IMPORTANT: Any unknown link = Go Dashboard, never 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
