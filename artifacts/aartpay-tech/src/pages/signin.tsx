import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Put email and password");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) alert(error.message);
    else navigate("/dashboard");
  };

  return (
    <div style={{ maxWidth: 360, margin: "60px auto", padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Sign In - AartPay</h1>
      <p style={{color: '#666', fontSize: '14px'}}>Login wey go work for Phone A and B</p>
      
      <input style={inputStyle} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      
      <button style={btnStyle} onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing..." : "Sign In"}
      </button>

      <p style={{textAlign:'center', marginTop:15}}>
        No account? <Link to="/signup" style={{fontWeight:'bold', color:'black'}}>Sign Up</Link>
      </p>
    </div>
  );
}
const inputStyle = { width:'100%', padding:'12px', margin:'8px 0', borderRadius:'8px', border:'1px solid #ccc', fontSize:'16px' } as any;
const btnStyle = { width:'100%', padding:'12px', marginTop:'10px', borderRadius:'8px', background:'black', color:'white', border:'none', fontWeight:'bold', fontSize:'16px' } as any;
