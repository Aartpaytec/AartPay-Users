import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
