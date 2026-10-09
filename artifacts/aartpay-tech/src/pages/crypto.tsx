import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CryptoEscrow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ amount: '', price: '' });
  const [virtualAccount, setVirtualAccount] = useState<any>(null);

  const handleInitiateSell = () => {
    if (!form.amount ||!form.price) {
      alert("Fill all fields!");
      return;
    }
    const va = {
      account_number: "815" + Math.floor(Math.random()*1000000000),
      bank_name: "WEMA Bank (Flutterwave)",
      account_name: "AartPay Escrow",
      amount_expected: `₦${Number(form.price) * Number(form.amount)}`,
      reference: `AART-${Date.now()}`
    };
    setVirtualAccount(va);
    setStep(2);
  };

  const simulatePaymentReceived = () => {
    setStep(3);
  };

  return (
    <div style={{minHeight: '100vh', padding: 20}}>
      <h1>Crypto Escrow</h1>
      <button onClick={()=>navigate("/dashboard")}>← Back to Dashboard</button>
      {step === 1 && (
        <div style={{marginTop: 20}}>
          <input placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} />
          <input placeholder="Price" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} style={{marginLeft: 8}}/>
          <button onClick={handleInitiateSell} style={{marginLeft: 8}}>Initiate</button>
        </div>
      )}
      {step === 2 && virtualAccount && (
        <div style={{marginTop: 20}}>
          <p>Send to: {virtualAccount.account_number} - {virtualAccount.bank_name}</p>
          <p>{virtualAccount.amount_expected}</p>
          <button onClick={simulatePaymentReceived}>Simulate Payment</button>
        </div>
      )}
      {step === 3 && <p style={{marginTop: 20, color: 'green'}}>Payment Received! Escrow secured.</p>}
    </div>
  );
}
