import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [showFund, setShowFund] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("balance");
    if (saved) setBalance(Number(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", String(balance));
  }, [balance]);

  const handleFund = () => {
    const amount = Number(fundAmount);
    if (amount > 0) {
      setBalance((prev) => prev + amount);
      setFundAmount("");
      setShowFund(false);
    }
  };

  return (
    <div style={{minHeight: '100vh', padding: 20}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{fontWeight: 'bold'}}>AartPay</h1>
        <div style={{display: 'flex', gap: 15}}>
          <span style={{color: '#7b61ff', cursor: 'pointer'}} onClick={()=>navigate("/crypto")}>Crypto</span>
          <span onClick={()=>{localStorage.removeItem("isLoggedIn"); navigate("/signin")}} style={{cursor: 'pointer'}}>Logout</span>
        </div>
      </div>
      <div style={{marginTop: 32}}>
        <h2>Balance: ₦{balance.toLocaleString()}</h2>
        <button onClick={()=>setShowFund(!showFund)} style={{marginTop: 10, padding: '8px 16px'}}>Fund Wallet</button>
        {showFund && (
          <div style={{marginTop: 10}}>
            <input value={fundAmount} onChange={e=>setFundAmount(e.target.value)} placeholder="Amount" type="number" />
            <button onClick={handleFund} style={{marginLeft: 8}}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
}
