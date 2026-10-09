import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { navigate("/signin"); return; }
      setUser(data.session.user);
      // get phone from user_metadata or profiles
      const metaPhone = data.session.user.user_metadata?.phone || "";
      setPhone(metaPhone);
      const { data: prof } = await supabase.from("profiles").select("phone").eq("id", data.session.user.id).single();
      if (prof?.phone) setPhone(prof.phone);
    });
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, fontFamily: 'sans-serif' }}>
      <h2>Welcome to AartPay</h2>
      <p>Email: {user?.email}</p>
      <p><b>Phone: {phone || "No phone saved"}</b></p>
      <p style={{fontSize: '12px', color:'#666'}}>Account saved in Supabase Cloud - Will NEVER disappear</p>
      <button onClick={logout} style={{marginTop:20, padding:'12px 20px', borderRadius:10, background:'black', color:'white', border:'none'}}>Logout</button>
    </div>
  );
}
