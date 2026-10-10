import { useNavigate } from "react-router-dom"
export default function Transfer() {
  const navigate = useNavigate();
  return (
    <div style={{padding:"16px", background:"#f5f7fb", minHeight:"100vh", fontFamily:"Arial"}}>
      <button onClick={()=>navigate("/dashboard")} style={{padding:"10px 18px", background:"black", color:"white", borderRadius:"20px", border:"none"}}>← Back</button>
      <div style={{background:"white", borderRadius:"16px", padding:"20px", marginTop:"16px"}}>
        <h3>Instant Transfer</h3>
        <p style={{fontSize:"12px", color:"#6b7280"}}>Powered by Flutterwave ⚡ - Money arrives in seconds</p>
        <input placeholder="Account Number" style={{width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #ddd", marginBottom:"10px"}} />
        <select style={{width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #ddd", marginBottom:"10px"}}>
          <option>Select Bank</option><option>Access</option><option>UBA</option><option>GTB</option><option>Opay</option><option>Kuda</option>
        </select>
        <input placeholder="Amount ₦" style={{width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #ddd", marginBottom:"12px"}} />
        <button style={{width:"100%", padding:"14px", background:"black", color:"white", borderRadius:"10px", border:"none"}}>Transfer Instantly - Flutterwave</button>
        <p style={{fontSize:"11px", textAlign:"center", marginTop:"8px", color:"#888"}}>Instant Transfer Powered by Flutterwave</p>
      </div>
    </div>
  )
}
