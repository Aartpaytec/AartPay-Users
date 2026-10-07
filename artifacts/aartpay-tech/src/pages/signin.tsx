import { useState } from "react";
import { useLocation } from "wouter";

export default function Signin() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 16, maxWidth: 400, width: "100%" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>Welcome Back</h1>
        <p style={{ color: "#666", textAlign: "center", marginBottom: 24 }}>Sign in to your AartPay account</p>
        <label style={{ display: "block", fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Phone Number</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" style={{ width: "100%", padding: 14, border: "1px solid #ddd", borderRadius: 8, fontSize: 16, marginBottom: 20 }} />
        <button onClick={() => phone ? alert("Signing in: " + phone) : alert("Enter phone")} style={{ width: "100%", padding: 14, background: "black", color: "white", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "600", marginBottom: 16 }}>Sign In</button>
        <p style={{ textAlign: "center", fontSize: 14 }}>Don't have account? <span onClick={() => setLocation("/signup")} style={{ color: "#2563EB", fontWeight: "600", cursor: "pointer" }}>Create Account</span></p>
      </div>
    </div>
  );
}
