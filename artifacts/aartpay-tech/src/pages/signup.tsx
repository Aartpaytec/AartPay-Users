import { useState } from "react";
import { useLocation } from "wouter";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setError("");
    if (!name || !phone || !password) {
      setError("Please fill all fields");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    setLoading(true);
    try {
      const savedData = localStorage.getItem("aartpay_users");
      const users = savedData ? JSON.parse(savedData) : [];

      if (users.find((u: any) => u.phone === phone)) {
        setError("Phone already registered. Please Sign In.");
        setLoading(false);
        return;
      }

      const newUser = { name, phone, password };
      users.push(newUser);
      localStorage.setItem("aartpay_users", JSON.stringify(users));
      
      alert("Account created! Now Sign In");
      setLocation("/signin");
    } catch (e) {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center" }}>Create Account</h1>
        <p style={{ textAlign: "center", color: "#666", marginTop: "8px", marginBottom: "24px" }}>Join AartPay today</p>

        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "500" }}>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "10px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "500" }}>Phone Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "10px" }} />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "500" }}>Password</label>
          <div style={{ position: "relative" }}>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" type={showPassword ? "text" : "password"} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "10px" }} />
            <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "12px", cursor: "pointer", fontSize: "14px", color: "#666" }}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button onClick={handleSignUp} disabled={loading} style={{ width: "100%", background: loading ? "#999" : "black", color: "white", padding: "14px", borderRadius: "10px", border: "none", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div style={{ textAlign: "center", marginTop: "16px", color: "#666" }}>
          Already have account? <span onClick={() => setLocation("/signin")} style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}>Sign In</span>
        </div>
      </div>
    </div>
  );
}
