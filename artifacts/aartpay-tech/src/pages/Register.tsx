import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { register } = useAuth();
  const nav = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", padding: 30, borderRadius: 16, width: "100%", maxWidth: 400 }}>
        <h1 style={{ margin: 0 }}>Create Account</h1>
        <p style={{ color: "#666" }}>Phone is compulsory, Email is optional</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name *" style={{ width: "100%", padding: 14, marginTop: 20, borderRadius: 10, border: "1px solid #ddd" }} />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number * 080..." style={{ width: "100%", padding: 14, marginTop: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (Optional)" style={{ width: "100%", padding: 14, marginTop: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password *" style={{ width: "100%", padding: 14, marginTop: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <button onClick={()=>{ if(!name||!phone||!pass) return alert("Name, Phone, Password required!"); if(phone.length<10) return alert("Valid phone needed"); register({name,phone,email,pass}); nav("/dashboard"); }} style={{ width: "100%", marginTop: 20, padding: 14, background: "#7c3aed", color: "white", border: "none", borderRadius: 10, fontWeight: "bold", fontSize: 16 }}>Sign Up</button>
        <p style={{ textAlign: "center", marginTop: 20 }}>Already have account? <Link to="/login" style={{ color: "#7c3aed", fontWeight: "bold" }}>Sign In</Link></p>
      </div>
    </div>
  );
}
