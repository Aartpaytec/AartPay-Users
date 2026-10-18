export default function Crypto(){
  return(
    <div style={{minHeight:'100vh',background:'#f8f9fb',fontFamily:'sans-serif',padding:'16px'}}>
      <h2 style={{margin:0}}>Crypto</h2>
      <p style={{fontSize:'12px',color:'#888'}}>Live rates</p>
      <div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
        <div style={{background:'white',padding:'14px',borderRadius:'14px',border:'1px solid #eee'}}>BTC — $69,420 / ₦112,450,000</div>
        <div style={{background:'white',padding:'14px',borderRadius:'14px',border:'1px solid #eee'}}>ETH — $2,840 / ₦4,250,000</div>
        <div style={{background:'white',padding:'14px',borderRadius:'14px',border:'1px solid #eee'}}>USDT — $1.00 / ₦1,650</div>
        <div style={{background:'white',padding:'14px',borderRadius:'14px',border:'1px solid #eee'}}>SOL — $145.20 / ₦238,000</div>
        <div style={{background:'white',padding:'14px',borderRadius:'14px',border:'1px solid #eee'}}>BNB — $610 / ₦1,010,000</div>
      </div>
    </div>
  )
}
