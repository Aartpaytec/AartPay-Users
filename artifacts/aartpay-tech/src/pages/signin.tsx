import { useState } from "react";
import { useLocation } from "wouter";

export default function SignIn() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setError("");
    if (!phone || !password) {
      setError("Please enter phone and password");
      return;
    }
    setLoading(true);
    try {
      const savedData = localStorage.getItem("aartpay_users");
      const savedUsers = savedData ? JSON.parse(savedData) : [];
      
      const user = savedUsers.find((u: any) => u.phone === phone);
      
      if (!user) {
        setError("No account found with this phone. Please Sign Up first.");
        setLoading(false);
        return;
      }
      
      if (user.password !== password) {
        setError("Incorrect password. Try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("aartpay_current_user", JSON.stringify(user));
      localStorage.setItem("aartpay_is_logged_in", "true");
      alert("Welcome! Login successful");
      setLocation("/dashboard");
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center" }}>Welcome Back</h1>
        <p style={{ textAlign: "center", color: "#666", marginTop: "8px", marginBottom: "24px" }}>Sign in to your AartPay account</p>

        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "500" }}>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "500" }}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "10px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "12px", top: "12px", cursor: "pointer", fontSize: "14px", color: "#666" }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{ width: "100%", background: loading ? "#999" : "black", color: "white", padding: "14px", borderRadius: "10px", border: "none", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div style={{ textAlign: "center", marginTop: "16px", color: "#666" }}>
          Don't have an account? <span onClick={() => setLocation("/signup")} style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}
