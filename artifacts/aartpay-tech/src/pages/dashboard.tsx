import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("salauwakeem584@gmail.com");
  const [phone, setPhone] = useState("09169527575");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const services = [
    { name: "Gift Cards", icon: "🎁", path: "/gift-cards" },
    { name: "Crypto", icon: "₿", path: "/crypto" },
    { name: "Dollar Cards", icon: "💳", path: "/dollar-cards" },
    { name: "TV Sub", icon: "📺", path: "/tv" },
    { name: "Electricity", icon: "💡", path: "/electricity" },
    { name: "Airtime & Data", icon: "📱", path: "/airtime" },
    { name: "Betting", icon: "🎰", path: "/betting" },
    { name: "Utilities", icon: "🧰", path: "/utilities" },
    { name: "Withdraw", icon: "ATM", path: "/transfer", sub: "Transfer" },
    { name: "Transfer", icon: "⚡", path: "/transfer", sub: "Flutterwave", color: "#10b981" },
    { name: "Escrow", icon: "🔒", path: "/escrow", sub: "Safe Trade", color: "#6366f1" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "Arial, sans-serif", paddingBottom: "30px" }}>
      
      {/* Header */}
      <div style={{ background: "black", color: "white", padding: "16px", borderRadius: "0 0 24px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px" }}>AartPay</h2>
            <p style={{ margin: "2px 0", fontSize: "11px", color: "#aaa" }}>{email}</p>
            <p style={{ margin: 0, fontSize: "11px", color: "#aaa" }}>{phone}</p>
          </div>
          <button onClick={handleLogout} style={{ background: "white", color: "black", border: "none", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>Logout</button>
        </div>

        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "16px", marginTop: "14px" }}>
          <p style={{ margin: 0, fontSize: "11px", color: "#888" }}>Wallet Balance</p>
          <h1 style={{ margin: "4px 0", fontSize: "26px" }}>₦ {balance.toFixed(2)}</h1>
          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button onClick={() => navigate("/fund-wallet")} style={{ flex: 1, background: "white", color: "black", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold", fontSize: "13px" }}>Fund Wallet</button>
            <button onClick={() => navigate("/transfer")} style={{ flex: 1, background: "#222", color: "white", border: "1px solid #333", padding: "12px", borderRadius: "10px", fontWeight: "bold", fontSize: "13px" }}>Transfer</button>
          </div>
        </div>
      </div>

      {/* All Services */}
      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "14px" }}>All Services</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {services.map((s) => (
            <div
              key={s.name}
              onClick={() => navigate(s.path)}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "18px",
                textAlign: "center",
                cursor: "pointer",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: "26px" }}>{s.icon === "ATM" ? <span style={{ border: "1px solid #333", padding: "2px 6px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold" }}>ATM</span> : s.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "bold", marginTop: "8px" }}>{s.name}</div>
              {s.sub && <div style={{ fontSize: "10px", color: s.color || "#10b981", marginTop: "2px", fontWeight: "bold" }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0, fontSize: "14px" }}>Recent Transactions</h3>
            <span style={{ fontSize: "11px", color: "#888" }}>0 txs</span>
          </div>
          <div style={{ background: "white", borderRadius: "12px", padding: "14px", marginTop: "8px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>No transaction yet. Your transactions go show here after Supabase table created — now e go work!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
