import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const cryptoAssets = [
  { name: "Bitcoin", symbol: "BTC", price: "$67,245", change: "+2.3%", color: "#f7931a" },
  { name: "Ethereum", symbol: "ETH", price: "$3,890", change: "+1.8%", color: "#627eea" },
  { name: "Tether", symbol: "USDT", price: "$1.00", change: "0.0%", color: "#26a17b" },
  { name: "BNB", symbol: "BNB", price: "$612", change: "+3.1%", color: "#f3ba2f" },
  { name: "Solana", symbol: "SOL", price: "$178", change: "+5.4%", color: "#9945ff" },
];

export default function Service() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pathId = window.location.pathname.replace("/", "") || "gift-cards";
  const serviceId = id || pathId;
  const [chat, setChat] = useState([{ from: "@system", text: "Escrow started. Buyer & Seller can chat safely here. Money held by AartPay." }]);
  const [msg, setMsg] = useState("");
  const [tempAcct] = useState("WEMA - 8234 567 8901 (AartPay Escrow - Salau)");
  const currentUser = JSON.parse(localStorage.getItem("aartpay_user") || "{}");
  const myTag = "@" + (currentUser?.username || "user_" + Math.floor(Math.random()*1000));

  // CRYPTO PAGE WITH LIST
  if (serviceId === "crypto") {
    return (
      <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Arial" }}>
        <button onClick={()=>navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd", background: "white" }}>← Back</button>
        <h2 style={{ marginTop: "16px" }}>Crypto Market</h2>
        <p style={{ color: "#64748b", fontSize: "13px" }}>Buy & Sell instantly - Powered by Quidax (SEC Licensed)</p>
        {cryptoAssets.map(c=>(
          <div key={c.symbol} style={{ background: "white", borderRadius: "12px", padding: "14px", marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: c.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{c.symbol[0]}</div>
              <div><b>{c.symbol}</b><div style={{ fontSize: "11px", color: "#888" }}>{c.name}</div></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold" }}>{c.price}</div>
              <div style={{ fontSize: "11px", color: c.change.includes("+")?"green":"red" }}>{c.change}</div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={()=>navigate("/escrow")} style={{ background: "black", color: "white", borderRadius: "8px", padding: "6px 10px", fontSize: "12px" }}>Buy</button>
              <button onClick={()=>navigate("/escrow")} style={{ background: "#e2e8f0", borderRadius: "8px", padding: "6px 10px", fontSize: "12px" }}>Sell</button>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "12px", background: "#eff6ff", padding: "10px", borderRadius: "10px", fontSize: "11px" }}>🔒 Escrow Protection available for all P2P trades. Click Buy/Sell to start secure escrow.</div>
      </div>
    );
  }

  // ESCROW WITH CHAT + TEMP ACCOUNT + USERNAME TAG
  if (serviceId === "escrow") {
    return (
      <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Arial" }}>
        <button onClick={()=>navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd", background: "white" }}>← Back</button>
        <div style={{ background: "white", borderRadius: "16px", padding: "16px", marginTop: "16px", maxWidth: "500px", margin: "16px auto" }}>
          <h2>🔒 Escrow - Safe Trade</h2>
          <div style={{ background: "#f0fdf4", border: "1px dashed #16a34a", borderRadius: "10px", padding: "10px", marginTop: "10px" }}>
            <div style={{ fontSize: "11px", color: "#15803d", fontWeight: "bold" }}>TEMPORARY ESCROW ACCOUNT (Auto-Generated):</div>
            <div style={{ fontWeight: "bold", marginTop: "4px" }}>{tempAcct}</div>
            <div style={{ fontSize: "11px" }}>Buyer pays here. Funds held by AartPay. Expires in 30 mins.</div>
            <div style={{ fontSize: "11px", color: "#888" }}>Connected to Crypto P2P & All Services</div>
          </div>

          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <div style={{ background: "#f1f5f9", borderRadius: "20px", padding: "6px 10px", fontSize: "12px" }}>Buyer: {myTag}</div>
            <div style={{ background: "#fef3c7", borderRadius: "20px", padding: "6px 10px", fontSize: "12px" }}>Seller: @seller_crypto</div>
          </div>

          {/* CHAT */}
          <div style={{ marginTop: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", height: "240px", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "8px", fontWeight: "bold", borderBottom: "1px solid #eee", fontSize: "13px" }}>Escrow Chat - Buyer ↔ Seller</div>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
              {chat.map((c,i)=><div key={i} style={{ fontSize: "12px", marginTop: "6px" }}><b>{c.from}:</b> {c.text}</div>)}
            </div>
            <div style={{ display: "flex", padding: "8px", gap: "6px" }}>
              <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder={`Message as ${myTag}...`} style={{ flex: 1, padding: "8px", borderRadius: "20px", border: "1px solid #ddd" }} />
              <button onClick={()=>{ if(!msg) return; setChat([...chat, {from: myTag, text: msg}]); setMsg(""); }} style={{ background: "black", color: "white", borderRadius: "20px", padding: "8px 14px" }}>Send</button>
            </div>
          </div>

          <button style={{ width: "100%", marginTop: "12px", padding: "12px", background: "black", color: "white", borderRadius: "10px", fontWeight: "bold" }}>Confirm & Release Funds (Instant)</button>
        </div>
      </div>
    );
  }

  // OTHER PAGES
  return (
    <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Arial" }}>
      <button onClick={()=>navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd", background: "white" }}>← Back</button>
      <div style={{ marginTop: "20px", background: "white", borderRadius: "16px", padding: "20px" }}>
        <h2 style={{ textTransform: "capitalize" }}>{serviceId.replace("-", " ")}</h2>
        <p style={{ color: "#888", fontSize: "13px" }}>Service coming live. Connected to secure escrow.</p>
        <input placeholder="Enter details" style={{ width: "100%", padding: "12px", marginTop: "12px", borderRadius: "10px", border: "1px solid #ddd" }} />
        <button onClick={()=>navigate("/escrow")} style={{ width: "100%", marginTop: "12px", padding: "12px", background: "black", color: "white", borderRadius: "10px" }}>Continue to Secure Escrow</button>
      </div>
    </div>
  );
}
