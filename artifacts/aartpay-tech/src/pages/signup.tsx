import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { phone: phone }
      }
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // Save phone to profiles table also
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: email,
        phone: phone
      });
    }

    setLoading(false);
    // AUTO GO TO DASHBOARD - NO NEED LOGIN AGAIN
    navigate("/dashboard");
  };

  return (
    <div style={{maxWidth:400, margin:"40px auto", padding:24}}>
      <h2>Create AartPay Account</h2>
      <form onSubmit={handleSignUp} style={{display:"flex", flexDirection:"column", gap:12, marginTop:20}}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{padding:12, borderRadius:8, border:"1px solid #ccc"}} />
        <input type="tel" placeholder="Phone 080..." value={phone} onChange={e=>setPhone(e.target.value)} required style={{padding:12, borderRadius:8, border:"1px solid #ccc"}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={{padding:12, borderRadius:8, border:"1px solid #ccc"}} />
        <button type="submit" disabled={loading} style={{padding:12, borderRadius:8, background:"black", color:"white", border:"none", fontWeight:"bold"}}>
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
      <p style={{marginTop:12}}>Already have account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
}
