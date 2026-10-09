import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignIn from "./pages/signin"
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"
import CryptoEscrow from "./pages/crypto"

// Simple placeholder for all other services so e no bang you out again
function ComingSoon({ title }: {title:string}) {
  return (
    <div style={{maxWidth:480, margin:"0 auto", padding:20, fontFamily:"sans-serif", minHeight:"100vh", background:"#f5f7fb"}}>
      <a href="/dashboard" style={{textDecoration:"none"}}>← Back to Dashboard</a>
      <h2 style={{marginTop:20}}>{title}</h2>
      <div style={{background:"white", padding:24, borderRadius:16, marginTop:16, textAlign:"center"}}>
        <div style={{fontSize:40}}>🚧</div>
        <p style={{marginTop:12, fontWeight:700}}>{title} is coming live soon</p>
        <p style={{fontSize:13, color:"#666"}}>Your dashboard + crypto escrow + chat don work. We go connect {title} next after this fix.</p>
        <a href="/dashboard"><button style={{marginTop:16, padding:12, width:"100%", background:"black", color:"white", borderRadius:10, border:"none", fontWeight:700}}>Go Dashboard</button></a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crypto" element={<CryptoEscrow />} />
        {/* All 9 services — no more bang out */}
        <Route path="/giftcard" element={<ComingSoon title="Gift Cards" />} />
        <Route path="/cards" element={<ComingSoon title="Dollar Cards" />} />
        <Route path="/tv" element={<ComingSoon title="TV Subscription" />} />
        <Route path="/electricity" element={<ComingSoon title="Electricity" />} />
        <Route path="/airtime" element={<ComingSoon title="Airtime & Data" />} />
        <Route path="/betting" element={<ComingSoon title="Betting" />} />
        <Route path="/utilities" element={<ComingSoon title="Utilities" />} />
        <Route path="/withdraw" element={<ComingSoon title="Withdraw" />} />
        <Route path="/kyc" element={<ComingSoon title="KYC Verification" />} />
      </Routes>
    </BrowserRouter>
  )
}
