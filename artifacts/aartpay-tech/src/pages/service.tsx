import { useNavigate, useParams } from "react-router-dom";

const servicesData: any = {
  "gift-cards": { title: "🎁 Gift Cards", desc: "Buy & Sell Gift Cards at best rate", placeholder: "e.g. Amazon $100" },
  "crypto": { title: "₿ Crypto", desc: "Buy & Sell BTC, USDT instantly", placeholder: "e.g. BTC 0.01" },
  "dollar-cards": { title: "💳 Dollar Cards", desc: "Create & Fund USD Virtual Cards", placeholder: "Amount $10" },
  "tv": { title: "📺 TV Subscription", desc: "DSTV, GOTV, Startimes - Instant activation", placeholder: "Decoder Number" },
  "electricity": { title: "💡 Electricity", desc: "Pay PHCN / EKEDC / IKEDC bills", placeholder: "Meter Number" },
  "airtime": { title: "📱 Airtime & Data", desc: "MTN, GLO, Airtel, 9mobile - Instant", placeholder: "Phone Number" },
  "betting": { title: "🎰 Betting", desc: "Fund Bet9ja, 1xBet, SportyBet", placeholder: "Bet ID / Username" },
  "utilities": { title: "🧰 Utilities", desc: "All other bills & payments", placeholder: "What you want pay?" },
  "fund-wallet": { title: "💰 Fund Wallet", desc: "Fund with Flutterwave - Instant", placeholder: "Amount ₦" },
};

export default function Service() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = servicesData[id || "gift-cards"] || servicesData["gift-cards"];

  return (
    <div style={{minHeight:"100vh", background:"#f5f7fb", padding:"16px", fontFamily:"Arial"}}>
      <button onClick={()=>navigate("/dashboard")} style={{background:"black", color:"white", padding:"10px 18px", borderRadius:"20px", border:"none", fontWeight:"bold"}}>← Back</button>
      
      <div style={{background:"white", marginTop:"20px", padding:"20px", borderRadius:"16px", border:"1px solid #eee"}}>
        <h2 style={{margin:"0"}}>{data.title}</h2>
        <p style={{color:"#666", fontSize:"13px", marginTop:"6px"}}>{data.desc}</p>
        
        <input placeholder={data.placeholder} style={{width:"100%", padding:"14px", marginTop:"16px", borderRadius:"10px", border:"1px solid #ddd", fontSize:"14px"}} />
        <input placeholder="Amount ₦ / $" style={{width:"100%", padding:"14px", marginTop:"12px", borderRadius:"10px", border:"1px solid #ddd", fontSize:"14px"}} />
        
        <button onClick={()=>alert(`${data.title} - Going live in 24hrs! Your money safe with AartPay`)} style={{width:"100%", marginTop:"16px", background:"black", color:"white", padding:"14px", borderRadius:"12px", border:"none", fontWeight:"bold", fontSize:"14px"}}>
          Continue to Pay
        </button>

        <div style={{marginTop:"14px", background:"#f0fdf4", padding:"10px", borderRadius:"10px", fontSize:"11px", textAlign:"center", color:"#16a34a", fontWeight:"bold"}}>
          ✅ Secured by AartPay × Flutterwave
        </div>
      </div>
    </div>
  );
}
