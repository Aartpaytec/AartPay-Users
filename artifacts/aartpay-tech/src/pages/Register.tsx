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
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !email || !pass) {
      alert("Fill all fields");
      return;
    }
    setLoading(true);
    try {
      await register(phone, email, pass, name);
      alert("Account created! Now login");
      nav("/login");
    } catch (e: any) {
      alert("Error: " + e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "white", padding: 24, borderRadius: 12, width: 320 }}>
        <h1 style={{ margin: 0 }}>Create Account</h1>
        <p style={{ color: "#666" }}>Phone is compulsory</p>
        <input style={{ width: "100%", marginBottom: 10, padding: 10 }} placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
        <input style={{ width: "100%", marginBottom: 10, padding: 10 }} placeholder="Phone e.g 080..." value={phone} onChange={e=>setPhone(e.target.value)} />
        <input style={{ width: "100%", marginBottom: 10, padding: 10 }} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={{ width: "100%", marginBottom: 10, padding: 10 }} placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        <button onClick={handleRegister} disabled={loading} style={{ width: "100%", padding: 12, background: "black", color: "white", borderRadius: 8 }}>
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <p style={{ textAlign: "center", marginTop: 12 }}><Link to="/login">Already have account? Login</Link></p>
      </div>
    </div>
  );
}
