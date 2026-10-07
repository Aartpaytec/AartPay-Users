import { useState } from "react";
import { useLocation } from "wouter";

export default function Signin() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (!phone || !password) {
      alert("Please enter phone and password");
      return;
    }
    alert("Signing in with: " + phone);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 16, maxWidth: 400, width: "100%" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>Welcome Back</h1>
        <p style={{ color: "#666", textAlign: "center", marginBottom: 24 }}>Sign in to your AartPay account</p>
        
        <label style={{ display: "block", fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Phone Number</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" style={{ width: "100%", padding: 14, border: "1px solid #ddd", borderRadius: 8, fontSize: 16, marginBottom: 16 }} />
        
        <label style={{ display: "block", fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Password</label>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" style={{ width: "100%", padding: 14, border: "1px solid #ddd", borderRadius: 8, fontSize: 16 }} />
          <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 14, top: 14, cursor: "pointer", fontSize: 14, color: "#2563EB" }}>{showPassword ? "Hide" : "Show"}</span>
        </div>

        <button onClick={handleSignIn} style={{ width: "100%", padding: 14, background: "black", color: "white", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "600", marginBottom: 16 }}>Sign In</button>
        <p style={{ textAlign: "center", fontSize: 14 }}>Don't have account? <span onClick={() => setLocation("/signup")} style={{ color: "#2563EB", fontWeight: "600", cursor: "pointer" }}>Create Account</span></p>
      </div>
    </div>
  );
}
