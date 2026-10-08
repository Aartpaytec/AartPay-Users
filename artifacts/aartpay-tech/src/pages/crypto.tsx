import { useState } from "react";
import { useLocation } from "wouter";

export default function CryptoEscrow() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ asset: "BTC", amount: "", price: "", buyerAddress: "", sellerBank: "" });
  const [virtualAccount, setVirtualAccount] = useState<any>(null);

  const handleInitiateSell = () => {
    if (!form.amount || !form.price || !form.buyerAddress || !form.sellerBank) {
      alert("Fill all fields!");
      return;
    }
    const va = {
      account_number: "815" + Math.floor(Math.random()*10000000),
      bank_name: "WEMA Bank (Flutterwave)",
      account_name: `AartPay Escrow - ${form.asset} Sale`,
      amount_expected: `₦${Number(form.price).toLocaleString()}`,
      reference: `AART-${Date.now()}`
    };
    setVirtualAccount(va);
    setStep(2);
  };

  const simulatePaymentReceived = () => {
    setStep(3);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14', color: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>🔐 Crypto Escrow</h1>
        <button onClick={() => setLocation("/dashboard")} style={{ background: '#1a1a2e', color: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid #2a2a4a', fontSize: '12px' }}>← Back to Dashboard</button>
      </div>
      <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Seller initiates → Flutterwave generates virtual account → Buyer pays → Asset auto-release + Money to seller</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
        <span style={{ background: step>=1?'#a78bfa':'#1a1a2e', color: step>=1?'black':'#9ca3af', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>1. Seller Initiates Sell</span>
        <span style={{ background: step>=2?'#a78bfa':'#1a1a2e', color: step>=2?'black':'#9ca3af', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>2. Buyer Pays to Virtual Account</span>
        <span style={{ background: step>=3?'#16a34a':'#1a1a2e', color: step>=3?'white':'#9ca3af', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>3. Auto Release</span>
      </div>

      {step === 1 && (
        <div style={{ background: '#12121f', border: '1px solid #2a2a4a', padding: '20px', borderRadius: '12px', marginTop: '20px', maxWidth: '480px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '14px' }}>Seller: Initiate Asset Sale</h3>
          <select value={form.asset} onChange={e=>setForm({...form, asset: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '10px', borderRadius: '8px', background: '#0a0a14', color: 'white', border: '1px solid #2a2a4a' }}>
            <option>BTC</option><option>USDT (TRC20)</option><option>USDT (ERC20)</option><option>ETH</option><option>BNB</option>
          </select>
          <input placeholder="Amount to sell e.g 0.05" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '10px', borderRadius: '8px', background: '#0a0a14', border: '1px solid #2a2a4a', color: 'white' }}/>
          <input placeholder="Price in Naira e.g 500000" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '10px', borderRadius: '8px', background: '#0a0a14', border: '1px solid #2a2a4a', color: 'white' }}/>
          <input placeholder="Buyer Wallet Address e.g bc1q..." value={form.buyerAddress} onChange={e=>setForm({...form, buyerAddress: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '10px', borderRadius: '8px', background: '#0a0a14', border: '1px solid #2a2a4a', color: 'white' }}/>
          <input placeholder="Your Bank Account Number (to receive money)" value={form.sellerBank} onChange={e=>setForm({...form, sellerBank: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '10px', borderRadius: '8px', background: '#0a0a14', border: '1px solid #2a2a4a', color: 'white' }}/>
          <button onClick={handleInitiateSell} style={{ width: '100%', marginTop: '16px', background: '#a78bfa', color: 'black', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Generate Flutterwave Virtual Account →</button>
        </div>
      )}

      {step === 2 && virtualAccount && (
        <div style={{ background: '#12121f', border: '1px solid #a78bfa', padding: '20px', borderRadius: '12px', marginTop: '20px', maxWidth: '480px', boxShadow: '0 0 20px rgba(167,139,250,0.2)' }}>
          <h3 style={{ fontWeight: 'bold', color: '#a78bfa', fontSize: '14px' }}>📩 Give This Account to Buyer</h3>
          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>Buyer must transfer EXACT amount to this Flutterwave Virtual Account:</p>
          <div style={{ background: '#0a0a14', padding: '16px', borderRadius: '8px', marginTop: '12px', fontSize: '13px', border: '1px dashed #2a2a4a' }}>
            <p>Bank: <b>{virtualAccount.bank_name}</b></p>
            <p>Account No: <b style={{ fontSize: '18px', color: '#a78bfa' }}>{virtualAccount.account_number}</b></p>
            <p>Account Name: <b>{virtualAccount.account_name}</b></p>
            <p>Amount: <b style={{ color: '#16a34a' }}>{virtualAccount.amount_expected}</b></p>
            <p style={{ fontSize: '10px', color: '#6b7280', marginTop: '8px' }}>Ref: {virtualAccount.reference}</p>
          </div>
          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '12px' }}>Once money lands here, system will:<br/>1. Auto-release {form.amount} {form.asset} to buyer address<br/>2. Auto-send {virtualAccount.amount_expected} to seller bank {form.sellerBank}</p>
          <button onClick={simulatePaymentReceived} style={{ width: '100%', marginTop: '16px', background: 'white', color: 'black', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Simulate Buyer Payment Received (Demo)</button>
          <p style={{ fontSize: '10px', color: '#6b7280', textAlign: 'center', marginTop: '8px' }}>In production: Flutterwave webhook triggers auto-release</p>
        </div>
      )}

      {step === 3 && virtualAccount && (
        <div style={{ background: '#052e16', border: '1px solid #16a34a', padding: '20px', borderRadius: '12px', marginTop: '20px', maxWidth: '480px' }}>
          <h3 style={{ fontWeight: 'bold', color: '#16a34a' }}>✅ Escrow Completed!</h3>
          <div style={{ marginTop: '12px', fontSize: '12px', lineHeight: '1.6' }}>
            <p>✓ Payment {virtualAccount.amount_expected} received in virtual account</p>
            <p>✓ {form.amount} {form.asset} sent to buyer: {form.buyerAddress.slice(0,20)}...</p>
            <p>✓ {virtualAccount.amount_expected} transferred to seller bank {form.sellerBank} via Flutterwave</p>
            <p style={{ marginTop: '8px', color: '#86efac' }}>No scam - asset + money released same time!</p>
          </div>
          <button onClick={()=>{setStep(1); setVirtualAccount(null); setForm({ asset: "BTC", amount: "", price: "", buyerAddress: "", sellerBank: "" })}} style={{ width: '100%', marginTop: '16px', background: '#16a34a', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}>Start New Escrow</button>
        </div>
      )}
    </div>
  );
}
