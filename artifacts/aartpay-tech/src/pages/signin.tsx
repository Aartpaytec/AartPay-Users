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

    // Get saved users from localStorage (saved during Sign Up)
    const savedUsers = JSON.parse(localStorage.getItem("aartpay_users") || "[]");
    
    // Find user with this phone
    const user = savedUsers.find((u: any) => u.phone === phone);

    setTimeout(() => {
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

      // Success - save login session
      localStorage.setItem("aartpay_current_user", JSON.stringify(user));
      localStorage.setItem("aartpay_is_logged_in", "true");
      
      setLoading(false);
      alert("Welcome back! Login successful 🎉");
      setLocation("/dashboard");
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: "white", padding: "24px" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Welcome Back</h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>Sign in to your AartPay account</p>

        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Phone Number</label>
        <input 
          type="tel" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08012345678"
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "16px" }}
        />

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Password</label>
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}
          />
          <span 
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "12px", top: "12px", cursor: "pointer", color: "#666", fontSize: "14px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button 
          onClick={handleSignIn}
          disabled={loading}
          style={{ width: "100%", background: loading ? "#999" : "black", color: "white", padding: "14px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={{ textAlign: "center", marginTop: "16px", color: "#666" }}>
          Don't have an account? <span onClick={() => setLocation("/signup")} style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
