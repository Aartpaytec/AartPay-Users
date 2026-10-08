import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [balance, setBalance] = useState(0);
  const [showFund, setShowFund] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("aartpay_balance");
    if (saved) setBalance(Number(saved));
    else setBalance(0);
  }, []);
  useEffect(() => { localStorage.setItem("aartpay_balance", balance.toString()); }, [balance]);

  const handleFund = () => {
    const amount = Number(fundAmount);
    if (amount > 0) { setBalance(prev => prev + amount); setFundAmount(""); setShowFund(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #1a1a2e' }}>
        <h1 style={{ fontWeight: 'bold' }}>💎 Aart Pay</h1>
        <nav style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#9ca3af' }}>
          <span style={{ color: '#a78bfa' }}>Dashboard</span>
          <span onClick={()=>setLocation("/crypto")} style={{ cursor: 'pointer' }}>Crypto Escrow</span>
        </nav>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', padding: '24px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold' }}>Nigeria's All-in-One Fintech Platform</h2>
          <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '8px' }}>24/7 Instant Bank Withdrawals via Flutterwave</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button style={{ background: 'white', color: 'black', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', border: 'none' }}>Withdraw Now</button>
            <button onClick={() => setShowFund(true)} style={{ background: '#1a1a2e', color: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #a78bfa' }}>Add Funds</button>
          </div>

          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Services</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
              {[
                { t: "Gift Cards", d: "Amazon, iTunes" },
                { t: "Crypto Trading", d: "Escrow Sell", action: () => setLocation("/crypto") },
                { t: "Dollar Cards", d: "Virtual USD" },
                { t: "Airtime & Data", d: "MTN, Airtel" },
                { t: "Electricity Bills", d: "Ikeja, AEDC" },
                { t: "TV Subscriptions", d: "DStv, GOtv" },
                { t: "Betting Funding", d: "SportyBet" },
                { t: "Utilities", d: "Water, Internet" },
              ].map((s,i) => (
                <div key={i} onClick={s.action} style={{ background: '#12121f', border: '1px solid #1a1a2e', padding: '12px', borderRadius: '10px', cursor: s.action?'pointer':'default' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '12px' }}>{s.t}</p>
                  <p style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: '#12121f', border: '1px solid #2a2a4a', padding: '20px', borderRadius: '16px' }}>
            <p style={{ color: '#9ca3af', fontSize: '12px' }}>Total Balance</p>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>₦{balance.toLocaleString()}.00</h2>
            <p style={{ fontSize: '10px', color: '#9ca3af' }}>{balance===0?'New customer - ₦0.00':'Your balance'}</p>
            <button onClick={() => balance===0?setShowFund(true):alert("Withdraw via Flutterwave")} style={{ width: '100%', marginTop: '16px', background: balance===0?'#2a2a4a':'#a78bfa', color: balance===0?'#9ca3af':'black', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '12px' }}>
              {balance===0?'Fund Wallet to Withdraw':'Instant Withdrawal →'}
            </button>
          </div>
        </div>
      </div>

      {showFund && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#12121f', padding: '24px', borderRadius: '16px', width: '320px', border: '1px solid #2a2a4a' }}>
            <h3 style={{ fontWeight: 'bold' }}>Add Funds</h3>
            <input type="number" value={fundAmount} onChange={e=>setFundAmount(e.target.value)} placeholder="5000" style={{ width: '100%', marginTop: '16px', padding: '12px', borderRadius: '8px', background: '#0a0a14', border: '1px solid #2a2a4a', color: 'white' }}/>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button onClick={()=>setShowFund(false)} style={{ flex:1, padding: '10px', borderRadius: '8px', background: '#1a1a2e', color: 'white', border: '1px solid #2a2a4a' }}>Cancel</button>
              <button onClick={handleFund} style={{ flex:1, padding: '10px', borderRadius: '8px', background: '#a78bfa', color: 'black', border: 'none', fontWeight: 'bold' }}>Fund</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
