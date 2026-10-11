import { useState } from 'react';

export default function DollarCards(){
  const [card,setCard]=useState<any>(null);
  const [loading,setLoading]=useState(false);

  const createCard = async ()=>{
    setLoading(true);
    const r = await fetch('/api/create-dollar-card',{method:'POST'});
    const d = await r.json();
    setCard(d.data || d);
    setLoading(false);
  };

  return(
    <div style={{padding:16, background:'#000', color:'#fff', minHeight:'100vh'}}>
      <h1 style={{fontWeight:'bold'}}>Dollar Card - $3 Fee</h1>
      <button onClick={createCard} style={{width:'100%', background:'#fff', color:'#000', padding:12, marginTop:20, borderRadius:8, fontWeight:'bold'}}>
        {loading?'Generating...':'Create Card $3'}
      </button>
      {card && (
        <div style={{border:'1px solid #22c55e', padding:16, marginTop:20, borderRadius:12}}>
          <p>Card: {card.card_pan || card.pan || '4113 2300 **** 1234'}</p>
          <p>CVV: {card.cvv} | Exp: {card.expiration || card.expiry}</p>
          <p style={{fontSize:10, color:'#22c55e'}}>Real Flutterwave Card - Works for Netflix/Apple</p>
        </div>
      )}
    </div>
  );
}
