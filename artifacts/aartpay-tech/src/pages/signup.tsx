import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !phone || !password) {
      alert("Fill Email, Phone and Password");
      return;
    }
    if (phone.length < 10) {
      alert("Enter valid phone e.g 08012345678");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { phone: phone.trim() } }
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      if (data.user) {
        // save to profiles if table exists
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: email.trim().toLowerCase(),
          phone: phone.trim()
        });
      }
      alert("Account created! Phone: " + phone);
      navigate("/signin");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 24, fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: 16 }}>
      <h2>Create Account</h2>
      <p style={{fontSize: '13px', color:'#666'}}>Email + Phone Number required</p>
      <input style={{width:'100%', padding:'14px', margin:'8px 0', borderRadius:'10px', border:'1px solid #ddd'}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input style={{width:'100%', padding:'14px', margin:'8px 0', borderRadius:'10px', border:'1px solid #ddd'}} placeholder="Phone 080..." value={phone} onChange={e=>setPhone(e.target.value)} type="tel" />
      <input style={{width:'100%', padding:'14px', margin:'8px 0', borderRadius:'10px', border:'1px solid #ddd'}} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <button style={{width:'100%', padding:'14px', marginTop:'10px', borderRadius:'10px', background:'black', color:'white', border:'none', fontWeight:'bold'}} onClick={handleSignUp} disabled={loading}>
        {loading? "Creating..." : "Register with Email & Number"}
      </button>
      <p style={{textAlign:'center', marginTop: 12}}>Already have? <Link to="/signin" style={{fontWeight:'bold'}}>Sign In</Link></p>
    </div>
  );
}
