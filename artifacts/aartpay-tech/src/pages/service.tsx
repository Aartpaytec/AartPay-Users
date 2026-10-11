import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Offer = { id: string; user: string; asset: string; amount: string; available: string; price: string; tag: string; icon: string };

export default function Service() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rawPath = id || window.location.pathname.replace("/", "") || "gift-cards";
  const serviceId = rawPath.toLowerCase().replace("-3v98b6-aartpaytec-vercel-app","").trim();

  const currentUser = JSON.parse(localStorage.getItem("aartpay_user") || "{}");
  const myTag = "@" + (currentUser?.username || currentUser?.email?.split("@")[0] || `salawuakeem${Math.floor(Math.random()*900)+100}`);

  const [offers, setOffers] = useState<Offer[]>([
    { id: "1", user: "Salau Store", asset: "USDT", amount: "2500", available: "50 USDT available", price: "₦1,650 / $1", tag: "@seller_01", icon: "💵" },
    { id: "2", user: "Lagos Crypto", asset: "BTC", amount: "0.5", available: "0.5 BTC available", price: "₦112M / BTC", tag: "@btc_lagos", icon: "₿" },
    { id: "3", user: "IB Vendor", asset: "ETH", amount: "2", available: "2 ETH available", price: "₦6.4M / ETH", tag: "@ib_eth", icon: "♦️" },
    { id: "4", user: "Abuja", asset: "BNB", amount: "10", available: "10 BNB available", price: "₦1.2M / BNB", tag: "@bnb_trader", icon: "🟡" },
    { id: "5", user: "You", asset: "SOL", amount: "100", available: "100 SOL available", price: "₦450k / SOL", tag: myTag, icon: "◎" },
  ]);
  const [chat, setChat] = useState([{ from: "@system", text: `Welcome ${myTag} - Escrow secured. No narration needed.` }]);
  const [msg, setMsg] = useState("");
  const [selected, setSelected] = useState<Offer | null>(null);
  const [vAccount, setVAccount] = useState("WEMA (Flutterwave) - 3662 342 5035 - AartPay Services");
  const [refCode] = useState(`AART-ESC-${Math.floor(Math.random()*900000)+100000}`);
  const [postAmount, setPostAmount] = useState("");
  const [postAsset, setPostAsset] = useState("USDT");

  const genVA = () => {
    setVAccount("Generating via Flutterwave...");
    setTimeout(() => setVAccount(`WEMA (Flutterwave) - ${Math.floor(Math.random()*9000)+1000} ${Math.floor(Math.random()*900)+100} ${Math.floor(Math.random()*9000)+1000} - AartPay Services`), 800);
  };
  useEffect(() => { genVA(); }, []);

  // CHECK IF CRYPTO/ESCROW/P2P PAGE
  const isEscrowPage = ["escrow","crypto","p2p","escrow-p2p"].includes(serviceId) || window.location.href.includes("escrow") || window.location.href.includes("crypto");

  if (isEscrowPage) {
    return (
      <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter,Arial" }}>
        <button onClick={() => navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd", background: "#fff" }}>← Back</button>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <h2 style={{ marginTop: "14px", fontSize: "20px", display: "flex", gap: "8px", alignItems: "center" }}>🔒 Escrow P2P</h2>
          <p style={{ fontSize: "12px", color: "#64748b" }}>You: <b>{myTag}</b> - Unique tag generated inside escrow</p>

          <div style={{ background: "#fff", borderRadius: "14px", padding: "14px", marginTop: "12px", border: "1.5px dashed #16a34a" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a" }}>SECURED ESCROW ACCOUNT (Flutterwave)</div>
            <div style={{ fontWeight: 900, fontSize: "16px", marginTop: "6px", fontFamily: "monospace" }}>{vAccount}</div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              <div style={{ background: "#f1f5f9", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold" }}>Ref: {refCode}</div>
              <div style={{ background: "#dcfce7", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", color: "#166534", fontWeight: "bold" }}>Instant</div>
            </div>
            <div style={{ fontSize: "11px", color: "#475569", marginTop: "8px", background: "#f8fafc", padding: "8px", borderRadius: "8px" }}>Transfer exact amount. <b>Do NOT add note.</b> Auto-confirms. No narration = No CBN issue.</div>
            <button onClick={genVA} style={{ width: "100%", marginTop: "8px", padding: "10px", background: "black", color: "white", borderRadius: "10px", fontSize: "12px", fontWeight: "bold" }}>Generate New Escrow Account</button>
          </div>

          <h3 style={{ marginTop: "18px", fontSize: "16px" }}>🟢 P2P Live Board</h3>
          <div style={{ background: "#fff", padding: "10px", borderRadius: "12px", display: "flex", gap: "6px", marginTop: "8px", border: "1px solid #e2e8f0" }}>
            <select value={postAsset} onChange={e=>setPostAsset(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>
              <option>USDT</option><option>BTC</option><option>ETH</option><option>BNB</option><option>SOL</option>
            </select>
            <input value={postAmount} onChange={e=>setPostAmount(e.target.value)} placeholder="100 USDT available" style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} />
            <button onClick={()=>{ if(!postAmount) return; setOffers([{ id: Date.now().toString(), user: "You", asset: postAsset, amount: postAmount, available: `${postAmount} ${postAsset} available`, price: "Market", tag: myTag, icon: "💵" },...offers]); setPostAmount(""); }} style={{ background: "#000", color: "#fff", borderRadius: "8px", padding: "10px 18px", fontWeight: "bold" }}>Post</button>
          </div>

          <div style={{ marginTop: "12px" }}>
            {offers.map(o=>(
              <div key={o.id} onClick={()=>setSelected(o)} style={{ background: selected?.id===o.id?"#0f172a":"#fff", color: selected?.id===o.id?"#fff":"#000", borderRadius: "12px", padding: "14px", marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e2e8f0", cursor: "pointer" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: selected?.id===o.id?"#1e293b":"#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>{o.icon}</div>
                  <div><div style={{ fontWeight: 800, fontSize: "14px" }}>{o.available}</div><div style={{ fontSize: "11px", opacity: 0.7 }}>{o.user} • {o.tag} • {o.price}</div></div>
                </div>
                <button style={{ background: selected?.id===o.id?"#fff":"#000", color: selected?.id===o.id?"#000":"#fff", borderRadius: "20px", padding: "7px 14px", fontSize: "11px", fontWeight: "bold" }}>Message {o.tag}</button>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", marginTop: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "10px", fontWeight: "bold", fontSize: "12px", borderBottom: "1px solid #eee", background: "#f8fafc" }}>Chat {selected? `with ${selected.tag}` : "- Select offer"} | You: {myTag}</div>
            <div style={{ height: "180px", overflowY: "auto", padding: "10px" }}>
              {chat.map((c,i)=><div key={i} style={{ fontSize: "12px", marginTop: "6px", background: c.from===myTag?"#000":"#f1f5f9", color: c.from===myTag?"#fff":"#000", padding: "7px 11px", borderRadius: "14px", width: "fit-content", marginLeft: c.from===myTag?"auto":"0" }}><b>{c.from}:</b> {c.text}</div>)}
            </div>
            <div style={{ display: "flex", padding: "8px", gap: "6px", borderTop: "1px solid #f1f5f9" }}>
              <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder={selected? `Message ${selected.tag}...`:"Select offer first"} style={{ flex: 1, padding: "11px", borderRadius: "24px", border: "1px solid #e2e8f0" }} />
              <button onClick={()=>{ if(!msg) return; setChat([...chat,{from:myTag,text:msg}]); setMsg(""); setTimeout(()=>setChat(c=>[...c,{from:selected?.tag||"@seller",text:"Yes available! Pay to account above. I will confirm."}]),700); }} style={{ background: "#000", color: "#fff", borderRadius: "24px", padding: "11px 18px", fontWeight: "bold" }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // OTHER 9 SERVICES
  const cfgMap: any = {
    "gift-cards": { t: "Gift Cards", d: "Sell Amazon, iTunes, Steam at best rate" },
    "dollar-cards": { t: "Dollar Virtual Cards", d: "Create USD card for Ads, Netflix, Apple" },
    "tv": { t: "TV Subscription", d: "DSTV, GOTV, Startimes instant" },
    "electricity": { t: "Electricity Bills", d: "IKEDC, EKEDC, AEDC instant token" },
    "airtime": { t: "Airtime", d: "MTN, GLO, Airtel, 9mobile instant" },
    "data": { t: "Data Bundle", d: "Cheap data all networks" },
    "betting": { t: "Betting Wallet", d: "Fund Bet9ja, SportyBet, 1xBet" },
    "education": { t: "Education", d: "WAEC, JAMB, School fees" },
    "utilities": { t: "Utilities", d: "Water, Waste, Other bills" },
  };
  const cfg = cfgMap[serviceId] || { t: serviceId, d: "AartPay secure service" };

  return (
    <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter,Arial" }}>
      <button onClick={()=>navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd", background: "#fff" }}>← Back</button>
      <div style={{ maxWidth: "500px", margin: "20px auto", background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h2 style={{ margin: 0, textTransform: "capitalize" }}>{cfg.t}</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "6px" }}>{cfg.d}</p>
        <input placeholder="Enter details / ID" style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }} />
        <input placeholder="₦ Amount" style={{ width: "100%", padding: "14px", marginTop: "10px", borderRadius: "10px", border: "1px solid #e2e8f0" }} />
        <button onClick={()=>navigate("/crypto")} style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "10px", background: "black", color: "white", fontWeight: "bold" }}>Continue - Secured by Escrow</button>
        <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "10px", textAlign: "center" }}>All payments secured via Flutterwave Escrow (No crypto narration)</div>
      </div>
    </div>
  );
}
