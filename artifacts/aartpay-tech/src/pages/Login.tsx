import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", padding: 30, borderRadius: 16, width: "100%", maxWidth: 380 }}>
        <h1 style={{ margin: 0 }}>Welcome Back</h1>
        <p style={{ color: "#666" }}>Sign in to AartPay</p>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number *" style={{ width: "100%", padding: 14, marginTop: 20, borderRadius: 10, border: "1px solid #ddd" }} />
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password *" style={{ width: "100%", padding: 14, marginTop: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <button onClick={()=>{ if(!phone||!pass) return alert("Fill phone & password"); if(login(phone,pass)) nav("/dashboard"); else alert("Wrong details - Sign up first"); }} style={{ width: "100%", marginTop: 20, padding: 14, background: "#7c3aed", color: "white", border: "none", borderRadius: 10, fontWeight: "bold", fontSize: 16 }}>Sign In</button>
        <p style={{ textAlign: "center", marginTop: 20 }}>New user? <Link to="/register" style={{ color: "#7c3aed", fontWeight: "bold" }}>Sign Up</Link></p>
      </div>
    </div>
  );
}
