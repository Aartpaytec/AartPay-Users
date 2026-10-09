import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });
    setLoading(false);
    if (error) alert(error.message);
    else {
      alert("Account created! Now Sign In on ANY phone");
      navigate("/signin");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{fontSize: '26px', fontWeight: 'bold'}}>Create Account</h1>
      <p style={{color: '#666', fontSize: '14px'}}>Works on Phone A & B</p>
      <input style={{width:'100%', padding:'14px', margin:'10px 0', borderRadius:'10px', border:'1px solid #ddd'}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input style={{width:'100%', padding:'14px', margin:'10px 0', borderRadius:'10px', border:'1px solid #ddd'}} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button style={{width:'100%', padding:'14px', marginTop:'12px', borderRadius:'10px', background:'black', color:'white', border:'none', fontWeight:'bold'}} onClick={handleSignUp} disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>
      <p style={{textAlign:'center', marginTop:20}}>Already have account? <Link to="/signin" style={{fontWeight:'bold', color:'black'}}>Sign In</Link></p>
    </div>
  );
}
