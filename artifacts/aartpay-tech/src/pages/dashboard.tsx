import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [txs, setTxs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate("/signin"); return; }
      const u = sess.session.user;
      setUser(u);
      setPhone(u.user_metadata?.phone || "");

      // fetch profile phone
      const { data: prof } = await supabase.from("profiles").select("phone").eq("id", u.id).single();
      if (prof?.phone) setPhone(prof.phone);

      // fetch transactions
      const { data: tr } = await supabase.from("transactions").select("*").eq("user_id", u.id).order("created_at", {ascending:false}).limit(10);
      setTxs(tr || []);
    };
    load();
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight:"100vh", background:"#f5f7fb", fontFamily:"sans-serif" }}>
      <div style={{background:"black", color:"white", padding:"20px", borderRadius:"0 0 24px 24px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <h3 style={{margin:0}}>AartPay</h3>
            <small style={{opacity:0.8}}>{user?.email}</small><br/>
            <small style={{opacity:0.9, fontWeight:600}}>{phone}</small>
          </div>
          <button onClick={logout} style={{padding:"8px 14px", borderRadius:8, border:"none", background:"white", color:"black", fontWeight:700}}>Logout</button>
        </div>
        <div style={{marginTop:18, background:"white", color:"black", padding:16, borderRadius:16}}>
          <small style={{color:"#666"}}>Wallet Balance</small>
          <h2 style={{margin:"6px 0"}}>₦ 0.00</h2>
          <div style={{display:"flex", gap:10, marginTop:12}}>
            <button style={{flex:1, padding:12, borderRadius:10, background:"black", color:"white", border:"none", fontWeight:600}}>Fund Wallet</button>
            <Link to="/crypto" style={{flex:1, textDecoration:"none"}}><button style={{width:"100%", padding:12, borderRadius:10, border:"1px solid #ddd", background:"white", fontWeight:600}}>Crypto Escrow</button></Link>
          </div>
        </div>
      </div>

      <div style={{padding:20}}>
        <h4 style={{margin:"0 0 12px"}}>All Services</h4>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          {[
            ["🎁","Gift Cards","/giftcard"],
            ["₿","Crypto","/crypto"],
            ["💳","Dollar Cards","/cards"],
            ["📺","TV Sub","/tv"],
            ["💡","Electricity","/electricity"],
            ["📱","Airtime & Data","/airtime"],
            ["🎰","Betting","/betting"],
            ["🚰","Utilities","/utilities"],
            ["🏧","Withdraw","/withdraw"],
          ].map(([icon, name, link])=>(
            <Link key={name} to={link} style={{textDecoration:"none", color:"black"}}>
              <div style={{background:"white", padding:18, borderRadius:16, textAlign:"center", boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize:26}}>{icon}</div>
                <div style={{marginTop:8, fontWeight:700, fontSize:13}}>{name}</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{marginTop:22, background:"white", padding:16, borderRadius:14}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <b>Recent Transactions</b>
            <small style={{color:"#888"}}>{txs.length} txs</small>
          </div>
          {txs.length === 0? (
            <p style={{color:"#888", fontSize:13, marginTop:10}}>No transaction yet. Your transactions go show here after Supabase tables created — now e go work!</p>
          ) : (
            txs.map(t => (
              <div key={t.id} style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #f0f0f0", fontSize:13}}>
                <span>{t.type}</span><span>₦{t.amount}</span><span style={{color:"green"}}>{t.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
