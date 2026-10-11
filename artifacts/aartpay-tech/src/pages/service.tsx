import { useNavigate, useParams } from "react-router-dom";

const servicesData: any = {
  "gift-cards": { title: "Gift Cards", desc: "Buy & Sell Gift Cards at best rate.", placeholder: "e.g. Amazon $100" },
  "crypto": { title: "Crypto", desc: "Buy & Sell BTC, USDT instantly.", placeholder: "e.g. BTC 0.01" },
  "dollar-cards": { title: "Dollar Cards", desc: "Create & Fund USD Virtual Cards.", placeholder: "Amount $10" },
  "tv": { title: "TV Subscription", desc: "DSTV, GOTV, Startimes - Instant activation.", placeholder: "Decoder No" },
  "electricity": { title: "Electricity", desc: "Pay PHCN, IKEDC Bills.", placeholder: "Meter Number" },
  "airtime": { title: "Airtime & Data", desc: "MTN, GLO, Airtel, 9mobile - Instant.", placeholder: "Phone Number" },
  "betting": { title: "Betting", desc: "Fund Bet9ja, SportyBet.", placeholder: "Bet ID / Username" },
  "utilities": { title: "Utilities", desc: "All other bills & payments.", placeholder: "What you want pay?" },
  "transfer": { title: "Transfer / Withdraw", desc: "Withdraw to bank, instant.", placeholder: "Amount to withdraw" },
  "escrow": { title: "Escrow", desc: "Secure payment with AartPay.", placeholder: "Amount" },
  "fund-wallet": { title: "Fund Wallet", desc: "Fund wallet with Flutterwave.", placeholder: "Amount" },
};

export default function Service() {
  const navigate = useNavigate();
  const { id } = useParams();
  // FIX: Get id from URL path if no param
  const pathId = window.location.pathname.replace("/", "").replace("service/", "") || "gift-cards";
  const serviceId = id || pathId;
  const data = servicesData[serviceId] || servicesData["gift-cards"];

  return (
    <div style={{ padding: "16px", fontFamily: "Arial", background: "#f6f6f6", minHeight: "100vh" }}>
      <button onClick={() => navigate("/dashboard")} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}>← Back to Dashboard</button>
      <div style={{ marginTop: "20px", background: "white", borderRadius: "16px", padding: "20px" }}>
        <h2 style={{ margin: 0 }}>{data.title}</h2>
        <p style={{ color: "#888" }}>{data.desc}</p>
        <input placeholder={data.placeholder} style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "12px", border: "1px solid #e7e7e7" }} />
        <button onClick={() => alert("Coming live next - VTU connect soon!")} style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "12px", background: "black", color: "white", fontWeight: "bold" }}>Continue to Pay</button>
        <div style={{ marginTop: "16px", background: "#fff7ed", padding: "12px", borderRadius: "12px", fontSize: "12px" }}>🔒 Secured by AartPay - Your money safe, you go receive value in 2hrs. Live in 24hrs.</div>
      </div>
    </div>
  );
}
