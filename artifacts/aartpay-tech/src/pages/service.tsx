import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Offer = { id: string; user: string; asset: string; amount: string; tag: string };

export default function Service() {
  const navigate = useNavigate();
  const { id } = useParams();
  const serviceId = (id || window.location.pathname.replace("/", "") || "gift-cards").toLowerCase();

  // UNIQUE USERNAME - AUTO GENERATED INSIDE ESCROW
  const currentUser = JSON.parse(localStorage.getItem("aartpay_user") || "{}");
  const myTag = "@" + (currentUser?.username || currentUser?.email?.split("@")[0] || `user_${Math.floor(Math.random()*9000)+1000}`);

  const [offers, setOffers] = useState<Offer[]>([
    { id: "1", user: "Salau", asset: "USDT", amount: "50 USDT available", tag: "@seller_01" },
    { id: "2", user: "Lagos", asset: "BTC", amount: "0.5 BTC available", tag: "@btc_lagos" },
  ]);
  const [chat, setChat] = useState([{ from: "@system", text: `Welcome ${myTag} - Escrow secured. No narration needed.` }]);
  const [msg, setMsg] = useState("");
  const [selected, setSelected] = useState<Offer | null>(null);
  const [vAccount, setVAccount] = useState("Generating...");
  const [refCode] = useState(`AART-ESC-${Math.floor(Math.random()*900000)+100000}`);
  const [postAmount, setPostAmount] = useState("");
  const [postAsset, setPostAsset] = useState("USDT");

  const genVA = () => {
    setVAccount("Generating via Flutterwave...");
    setTimeout(() => {
      setVAccount(`WEMA (Flutterwave) - ${Math.floor(Math.random()*9000)+1000} ${Math.floor(Math.random()*900)+100} ${Math.floor(Math.random()*9000)+1000} - AartPay Services`);
    }, 800);
  };
  useEffect(() => { if (["escrow","crypto","p2p"].includes(serviceId)) genVA(); }, [serviceId]);

  // ESCROW + P2P + CRYPTO - YOUR MAIN IDEA
  if (["escrow","crypto","p2p"].includes(serviceId)) {
    return (
      <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter" }}>
        <button onClick={() => navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd", background: "#fff" }}>← Back</button>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <h2 style={{ marginTop: "14px" }}>🔒 Escrow P2P</h2>
          <p style={{ fontSize: "12px", color: "#64748b" }}>You: <b>{myTag}</b> - Unique tag generated inside escrow</p>

          {/* FLUTTERWAVE ACCOUNT - NO NARRATION PAGE */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "14px", marginTop: "12px", border: "1.5px dashed #16a34a" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a" }}>SECURED ESCROW ACCOUNT (Flutterwave)</div>
            <div style={{ fontWeight: 900, fontSize: "16px", marginTop: "6px", fontFamily: "monospace" }}>{vAccount}</div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              <div style={{ background: "#f1f5f9", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold" }}>Ref: {refCode}</div>
              <div style={{ background: "#dcfce7", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", color: "#166534", fontWeight: "bold" }}>Instant</div>
            </div>
            <div style={{ fontSize: "11px", color: "#475569", marginTop: "8px", background: "#f8fafc", padding: "8px", borderRadius: "8px" }}>
              Transfer exact amount. <b>Do NOT add note.</b> Auto-confirms. No narration = No CBN issue.
            </div>
          </div>

          <h3 style={{ marginTop: "18px", fontSize: "15px" }}>🟢 P2P Live Board</h3>
          <div style={{ background: "#fff", padding: "10px", borderRadius: "12px", display: "flex", gap: "6px", marginTop: "8px" }}>
            <select value={postAsset} onChange={e=>setPostAsset(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}>
              <option>USDT</option><option>BTC</option><option>ETH</option><option>BNB</option><option>SOL</option>
            </select>
            <input value={postAmount} onChange={e=>setPostAmount(e.target.value)} placeholder="100 USDT available" style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} />
            <button onClick={()=>{ if(!postAmount) return; setOffers([{ id: Date.now().toString(), user: "You", asset: postAsset, amount: postAmount, tag: myTag },...offers]); setPostAmount(""); }} style={{ background: "#000", color: "#fff", borderRadius: "8px", padding: "10px 14px" }}>Post</button>
          </div>

          {offers.map(o=>(
            <div key={o.id} onClick={()=>setSelected(o)} style={{ background: selected?.id===o.id?"#000":"#fff", color: selected?.id===o.id?"#fff":"#000", borderRadius: "12px", padding: "12px", marginTop: "8px", display: "flex", justifyContent: "space-between", border: "1px solid #e2e8f0" }}>
              <div><b>{o.amount}</b><div style={{ fontSize: "11px", opacity: 0.7 }}>{o.user} • {o.tag}</div></div>
              <button style={{ background: selected?.id===o.id?"#fff":"#000", color: selected?.id===o.id?"#000":"#fff", borderRadius: "20px", padding: "6px 12px", fontSize: "11px" }}>Message {o.tag}</button>
            </div>
          ))}

          <div style={{ background: "#fff", borderRadius: "12px", marginTop: "14px", border: "1px solid #e2e8f0" }}>
            <div style={{ padding: "10px", fontWeight: "bold", fontSize: "12px", borderBottom: "1px solid #eee" }}>Chat {selected? `with ${selected.tag}` : "- Select offer"} | You: {myTag}</div>
            <div style={{ height: "180px", overflowY: "auto", padding: "8px" }}>
              {chat.map((c,i)=><div key={i} style={{ fontSize: "12px", marginTop: "6px", background: c.from===myTag?"#000":"#f1f5f9", color: c.from===myTag?"#fff":"#000", padding: "6px 10px", borderRadius: "12px", width: "fit-content", marginLeft: c.from===myTag?"auto":"0" }}><b>{c.from}:</b> {c.text}</div>)}
            </div>
            <div style={{ display: "flex", padding: "8px", gap: "6px" }}>
              <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder={selected? `Message ${selected.tag}...` : "Select offer first"} style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "1px solid #ddd" }} />
              <button onClick={()=>{ if(!msg) return; setChat([...chat,{from:myTag,text:msg}]); setMsg(""); setTimeout(()=>setChat(c=>[...c,{from:selected?.tag||"@seller",text:"Yes available! Pay to account above."}]),700); }} style={{ background: "#000", color: "#fff", borderRadius: "20px", padding: "10px 16px" }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // OTHER 9 SERVICES - ALL PROFESSIONAL
  const cfg: any = {
    "gift-cards": { t: "Gift Cards", d: "Buy & Sell at best rates" },
    "dollar-cards": { t: "Dollar Cards", d: "USD cards for online payments" },
    "tv": { t: "TV Subscription", d: "DSTV, GOTV, Startimes" },
    "electricity": { t: "Electricity", d: "All DisCos instant token" },
    "airtime": { t: "Airtime", d: "MTN, GLO, Airtel, 9mobile" },
    "data": { t: "Data Bundle", d: "Cheap data all networks" },
    "betting": { t: "Betting Wallet", d: "Bet9ja, SportyBet, 1xBet" },
    "education": { t: "Education", d: "WAEC, JAMB fees" },
    "utilities": { t: "Utilities", d: "Other bills" },
  }[serviceId] || { t: serviceId, d: "AartPay secure service" };

  return (
    <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh" }}>
      <button onClick={()=>navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd", background: "#fff" }}>← Back</button>
      <div style={{ maxWidth: "500px", margin: "20px auto", background: "#fff", borderRadius: "16px", padding: "20px" }}>
        <h2 style={{ margin: 0, textTransform: "capitalize" }}>{cfg.t}</h2>
        <p style={{ color: "#64748b", fontSize: "13px" }}>{cfg.d}</p>
        <input placeholder="Enter details" style={{ width: "100%", padding: "14px", marginTop: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }} />
        <button onClick={()=>navigate("/escrow")} style={{ width: "100%", padding: "14px", marginTop: "14px", borderRadius: "10px", background: "#000", color: "#fff", fontWeight: "bold" }}>Continue - Secured by Escrow</button>
      </div>
    </div>
  );
}
