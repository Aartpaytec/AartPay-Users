import { useState } from 'react';

export default function VirtualDollarCard() {
  const [plan, setPlan] = useState<'Regular'|'Platinum'>('Regular');

  const fee = plan === 'Regular' ? '$1.50' : '$5.00';
  const nairaFee = plan === 'Regular' ? '₦2,065.50' : '₦8,250.00';

  return (
    <div style={{minHeight:'100vh', background:'#f8f9fb', fontFamily:'-apple-system, sans-serif'}}>
      <div style={{background:'white', padding:'16px 20px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}}>
        <b style={{fontSize:'16px'}}>Virtual Dollar Card</b>
        <span>⋯</span>
      </div>

      <div style={{maxWidth:'380px', margin:'0 auto', padding:'20px'}}>
        <h2 style={{fontSize:'18px', fontWeight:700}}>Select Card Option</h2>
        <p style={{fontSize:'13px', color:'#888', marginTop:'4px'}}>Read the description and select the card that you prefer</p>

        <div style={{background:'#eeeeee', borderRadius:'100px', padding:'4px', display:'flex', width:'fit-content', marginTop:'18px', gap:'4px'}}>
          <button onClick={()=>setPlan('Regular')} style={{padding:'10px 24px', borderRadius:'100px', border:'none', background: plan==='Regular'?'white':'transparent', fontWeight:600, fontSize:'13px', boxShadow: plan==='Regular'?'0 1px 3px rgba(0,0,0,0.1)':''}}>Regular</button>
          <button onClick={()=>setPlan('Platinum')} style={{padding:'10px 24px', borderRadius:'100px', border:'none', background: plan==='Platinum'?'white':'transparent', fontWeight:600, fontSize:'13px', color: plan==='Platinum'?'black':'#999', boxShadow: plan==='Platinum'?'0 1px 3px rgba(0,0,0,0.1)':''}}>Platinum</button>
        </div>

        {/* CARD - REAL VISUAL */}
        <div style={{marginTop:'28px', display:'flex', justifyContent:'center'}}>
          <div style={{width:'100%', height:'200px', background:'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius:'22px', padding:'22px', color:'white', position:'relative'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <span style={{fontSize:'11px', letterSpacing:'2px', opacity:0.7}}>AARTPAY</span>
              <span style={{fontWeight:800, fontSize:'16px', fontStyle:'italic'}}>VISA</span>
            </div>
            <div style={{marginTop:'52px'}}>
              <div style={{width:'36px', height:'24px', background:'#f5c542', borderRadius:'4px', opacity:0.9}}></div>
              <p style={{marginTop:'12px', letterSpacing:'3px', fontSize:'15px'}}>•••• 2345</p>
              <p style={{fontSize:'11px', opacity:0.6, marginTop:'4px'}}>02/30 &nbsp; Salawu Akeem</p>
            </div>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
          <div style={{background:'#e6f4ea', color:'#137333', fontSize:'12px', padding:'8px 16px', borderRadius:'100px', fontWeight:500}}>
            Creation fee: <b>{fee} / {nairaFee}</b>
          </div>
        </div>

        <div style={{background:'white', borderRadius:'18px', padding:'18px', marginTop:'20px', border:'1px solid #f0f0f0'}}>
          <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'12px'}}>
            <div style={{minWidth:'20px', height:'20px', background:'black', borderRadius:'50%', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px'}}>✓</div>
            <span style={{fontSize:'13px'}}>Make payments & shop anywhere online</span>
          </div>
          <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <div style={{minWidth:'20px', height:'20px', background:'black', borderRadius:'50%', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px'}}>✓</div>
            <span style={{fontSize:'13px'}}>Easily manage your cards and spending</span>
          </div>
        </div>

        <button style={{width:'100%', background:'black', color:'white', padding:'16px', borderRadius:'100px', border:'none', fontWeight:600, fontSize:'15px', marginTop:'24px'}}>
          Continue - {fee}
        </button>

        <p style={{fontSize:'10px', color:'#aaa', textAlign:'center', marginTop:'12px'}}>AartPay • Your own brand</p>
      </div>
    </div>
  );
}
