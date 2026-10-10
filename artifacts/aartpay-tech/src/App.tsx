import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Transfer from "./pages/transfer";

const ServiceLayout = ({ title, children }: { title: string, children: any }) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "16px", fontFamily: "Arial", background: "#f5f7fb", minHeight: "100vh" }}>
      <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 18px", background: "black", color: "white", borderRadius: "20px", border: "none", marginBottom: "16px" }}>← Back to Dashboard</button>
      <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        {children}
        <p style={{fontSize:"11px", textAlign:"center", marginTop:"12px", color:"#888"}}>Instant Transfer Powered by Flutterwave ⚡</p>
      </div>
    </div>
  );
};

const EscrowPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "16px", fontFamily: "Arial", background: "#f5f7fb", minHeight: "100vh" }}>
      <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 18px", background: "black", color: "white", borderRadius: "20px", border: "none" }}>← Back</button>
      <div style={{ background: "white", borderRadius: "16px", padding: "20px", marginTop: "16px" }}>
        <h3>Escrow - Safe Trade</h3>
        <p style={{fontSize:"12px", color:"#6b7280"}}>Powered by Flutterwave - Virtual Account</p>
        <div style={{background:"#f0fdf4", padding:"12px", borderRadius:"8px", margin:"12px 0", border:"1px dashed #22c55e"}}>
          <p style={{fontSize:"12px", margin:0}}>Virtual Account Number:</p>
          <h2 style={{margin:"4px 0"}}>1234 5678 90 - Wema Bank</h2>
          <p style={{fontSize:"11px", color:"#666"}}>Buyer sends money here. Money holds in Escrow.</p>
        </div>
        <input placeholder="What are you buying/selling?" style={{width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #ddd", marginBottom:"10px"}} />
        <input placeholder="Amount ₦" style={{width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #ddd", marginBottom:"12px"}} />
        <button onClick={()=>navigate("/escrow-chat")} style={{width:"100%", padding:"14px", background:"#111", color:"white", borderRadius:"10px", border:"none", marginBottom:"8px"}}>Create Escrow & Open Chat</button>
        <button onClick={()=>navigate("/escrow-chat")} style={{width:"100%", padding:"14px", background:"white", color:"black", borderRadius:"10px", border:"1px solid black"}}>Go to Escrow Chat</button>
      </div>
    </div>
  )
};

const EscrowChatPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", fontFamily:"Arial", background:"#f5f7fb"}}>
      <div style={{padding:"12px", background:"black", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <button onClick={()=>navigate("/escrow")} style={{background:"transparent", color:"white", border:"none"}}>← Escrow</button>
        <span>Escrow Chat 🔒</span>
        <span style={{fontSize:"11px", background:"#22c55e", padding:"4px 8px", borderRadius:"10px"}}>Secured by Flutterwave</span>
      </div>
      <div style={{flex:1, padding:"12px", overflowY:"auto"}}>
        <div style={{background:"white", padding:"10px", borderRadius:"12px", marginBottom:"8px", maxWidth:"80%"}}>Buyer: I have sent ₦50k to virtual account 1234...</div>
        <div style={{background:"black", color:"white", padding:"10px", borderRadius:"12px", marginBottom:"8px", maxWidth:"80%", marginLeft:"auto"}}>Seller: Seen! I will release once confirmed.</div>
        <div style={{textAlign:"center", fontSize:"11px", color:"#888", margin:"12px 0"}}>Money is held in Flutterwave virtual account - No one can cheat</div>
      </div>
      <div style={{padding:"12px", background:"white", display:"flex", gap:"8px"}}>
        <input placeholder="Type message..." style={{flex:1, padding:"12px", borderRadius:"20px", border:"1px solid #ddd"}} />
        <button style={{padding:"12px 16px", background:"black", color:"white", borderRadius:"20px", border:"none"}}>Send</button>
      </div>
      <div style={{padding:"12px", background:"white", borderTop:"1px solid #eee", display:"flex", gap:"8px"}}>
        <button style={{flex:1, padding:"12px", background:"#22c55e", color:"white", borderRadius:"8px", border:"none"}}>✅ Confirm & Release Money</button>
        <button style={{flex:1, padding:"12px", background:"#ef4444", color:"white", borderRadius:"8px", border:"none"}}>⚠️ Dispute</button>
      </div>
    </div>
  )
};

const GiftCardsPage = () => (
  <ServiceLayout title="Gift Cards">
    <select style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px" }}><option>Amazon, Apple, Steam</option></select>
    <input placeholder="Amount ($)" style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
    <button style={{ width: "100%", padding: "14px", background: "black", color: "white", borderRadius: "10px", border: "none" }}>Sell Gift Card</button>
  </ServiceLayout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/escrow" element={<EscrowPage />} />
        <Route path="/escrow-chat" element={<EscrowChatPage />} />
        <Route path="/giftcards" element={<GiftCardsPage />} />
        <Route path="/gift-cards" element={<GiftCardsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
