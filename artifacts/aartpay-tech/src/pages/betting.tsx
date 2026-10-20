import { useState } from 'react';
const companies = [
  { id: 'sportybet', name: 'SportyBet' },
  { id: 'bet9ja', name: 'Bet9ja' },
  { id: 'betking', name: 'BetKing' },
  { id: '1xbet', name: '1xBet' },
  { id: 'merrybet', name: 'MerryBet' },
  { id: 'betano', name: 'Betano' },
];
export default function Betting(){
  const [company,setCompany]=useState('sportybet');
  const [walletId,setWalletId]=useState('08136072683');
  const [amount,setAmount]=useState('');
  return(
    <div style={{padding:16,background:'#eef2f7',minHeight:'100vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <button onClick={()=>history.back()} style={{border:'none',background:'#fff',padding:'10px 14px',borderRadius:8,color:'#000',fontWeight:700}}>← Back</button>
        <b style={{color:'#000'}}>Betting</b>
        <span style={{background:'#fff',padding:'10px 14px',borderRadius:8,color:'#000',fontWeight:600}}>History</span>
      </div>
      <div style={{background:'#fff',padding:16,borderRadius:16}}>
        <p style={{fontWeight:700,color:'#000',marginBottom:8}}>Select Betting Company</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {companies.map(c=>(
            <button key={c.id} onClick={()=>setCompany(c.id)} style={{
              padding:12,borderRadius:10,
              border: company===c.id ? '2px solid #16a34a' : '1px solid #ccc',
              background: company===c.id ? '#dcfce7' : '#fff',
              color:'#000',fontWeight:800,fontSize:13
            }}>{c.name}</button>
          ))}
        </div>
        <p style={{fontWeight:700,color:'#000',marginTop:16}}>Enter Betting Wallet ID</p>
        <input value={walletId} onChange={e=>setWalletId(e.target.value)} style={{width:'100%',padding:14,borderRadius:10,border:'1px solid #ccc',marginTop:6,color:'#000'}}/>
        <p style={{fontWeight:700,color:'#000',marginTop:16}}>Amount</p>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="100 - 1000000" style={{width:'100%',padding:14,borderRadius:10,border:'1px solid #ccc',marginTop:6,color:'#000'}}/>
        <button style={{marginTop:20,width:'100%',background:'#16a34a',color:'#fff',padding:14,borderRadius:12,border:'none',fontWeight:800,fontSize:16}}>
          Fund {companies.find(x=>x.id===company)?.name}
        </button>
      </div>
    </div>
  )
}
