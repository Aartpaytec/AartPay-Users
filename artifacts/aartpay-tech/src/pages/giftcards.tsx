import { useState } from 'react';

const countries = [
  { flag:'🇳🇬', name:'Nigeria (International)' },
  { flag:'🇳🇬', name:'Nigeria (Local)' },
  { flag:'🇺🇸', name:'United States' },
  { flag:'🇬🇧', name:'United Kingdom' },
  { flag:'🇨🇦', name:'Canada' },
];

const categories = [
  'Amazon', 'Apple / iTunes', 'Google Play', 'Steam',
  'eBay', 'Vanilla', 'Walmart', 'Visa', 'Nike', 'Sephora'
];

export default function GiftCards(){
  const [mode,setMode]=useState<'buy'|'sell'>('buy');
  const [filter,setFilter]=useState('Physical');
  const [cat,setCat]=useState('');
  const [amount,setAmount]=useState('');
  const [showList,setShowList]=useState(false);

  return(
    <div style={{background:'#f2f5f9',minHeight:'100vh',fontFamily:'sans-serif'}}>
      <div style={{padding:16,background:'#fff',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <button onClick={()=>history.back()} style={{border:'1px solid #ddd',background:'#fff',padding:'8px 12px',borderRadius:8,fontWeight:700}}>← Back</button>
        <b>AartPay Gift Cards</b><span>☰</span>
      </div>

      <div style={{display:'flex',gap:8,padding:12}}>
        <button onClick={()=>setMode('buy')} style={{flex:1,padding:14,borderRadius:12,border:'none',fontWeight:800,background: mode==='buy' ? '#16a34a' : '#fff',color: mode==='buy' ? '#fff' : '#000'}}>Buy Gift Card</button>
        <button onClick={()=>setMode('sell')} style={{flex:1,padding:14,borderRadius:12,border:'none',fontWeight:800,background: mode==='sell' ? '#16a34a' : '#fff',color: mode==='sell' ? '#fff' : '#000'}}>Sell Gift Card</button>
      </div>

      {mode==='buy' ? (
        <div style={{padding:16}}>
          <input placeholder="Search Countries" style={{width:'100%',padding:12,borderRadius:10,border:'1px solid #ddd'}} />
          <p style={{marginTop:12,fontWeight:600}}>Which country would you like to buy from?</p>
          {countries.map(c=>(
            <div key={c.name} style={{background:'#fff',padding:14,borderRadius:12,marginTop:8,border:'1px solid #eee',display:'flex',justifyContent:'space-between'}}>
              <span>{c.flag} {c.name}</span><span>›</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{padding:16}}>
          <div style={{display:'flex',gap:8}}>
            {['Physical','E-code'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:'6px 14px',borderRadius:20,border:'none',background: filter===f ? '#111' : '#fff',color: filter===f ? '#fff' : '#000',fontWeight:600}}>{f}</button>
            ))}
          </div>

          <div onClick={()=>setShowList(!showList)} style={{background:'#fff',padding:14,borderRadius:12,marginTop:12,border:'1px solid #ddd',display:'flex',justifyContent:'space-between'}}>
            <span>{cat || 'Select Category'}</span><span>▼</span>
          </div>

          {showList && (
            <div style={{background:'#fff',borderRadius:12,marginTop:8,border:'1px solid #eee',maxHeight:250,overflow:'auto'}}>
              {categories.map(x=>(
                <div key={x} onClick={()=>{setCat(x); setShowList(false)}} style={{padding:12,borderBottom:'1px solid #f1f1f1'}}>{x}</div>
              ))}
            </div>
          )}

          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter Gift Card Amount" style={{width:'100%',padding:14,marginTop:12,borderRadius:12,border:'1px solid #ddd'}} />
          <div style={{background:'#dcfce7',padding:14,borderRadius:12,marginTop:8,fontWeight:800,color:'#16a34a'}}>₦{amount ? (Number(amount)*850).toLocaleString() : '0.00'} - Receive in NGN</div>
          <input placeholder="Optional comment (E-code)" style={{width:'100%',padding:14,marginTop:12,borderRadius:12,border:'1px solid #ddd'}} />
          <div style={{background:'#fff',padding:14,borderRadius:12,marginTop:12,border:'1px dashed #aaa',textAlign:'center'}}>📷 Upload Gift Card Image</div>
          <button style={{width:'100%',marginTop:16,padding:14,borderRadius:12,border:'none',background:'#16a34a',color:'#fff',fontWeight:800}}>Proceed</button>
        </div>
      )}
    </div>
  )
}
