import { useState } from "react"

export default function Signup(){
  const [name,setName]=useState("")
  const [phone,setPhone]=useState("")
  const [password,setPassword]=useState("")
  const [showPassword,setShowPassword]=useState(false)
  const [msg,setMsg]=useState("")

  const onSubmit=(e:any)=>{
    e.preventDefault()
    
    if(!name || !phone || !password){
      setMsg("Please fill all fields")
      return
    }

    if(password.length < 6){
      setMsg("Password must be at least 6 characters")
      return
    }

    const users=JSON.parse(localStorage.getItem("aartpay_users") || "[]")
    
    // Check if phone already exists
    if(users.find((u:any) => u.phone === phone)){
      setMsg("Account already exists with this phone. Please Sign In.")
      return
    }

    users.push({name, phone, password, id: Date.now()})
    localStorage.setItem("aartpay_users", JSON.stringify(users))
    
    setMsg("Account created! Now Sign In 🎉")
    setName(""); setPhone(""); setPassword("")
  }

  return (
    <div style={{padding:"40px 20px", maxWidth:"400px", margin:"0 auto"}}>
      <h1 style={{fontSize:"24px",fontWeight:"bold", marginBottom:"8px"}}>Create Account</h1>
      <p style={{color:"#666", marginBottom:"24px"}}>Join AartPay today</p>
      
      <form onSubmit={onSubmit}>
        <label style={{display:"block", marginBottom:"8px", fontWeight:"500"}}>Full Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"8px",marginBottom:"16px"}} />
        
        <label style={{display:"block", marginBottom:"8px", fontWeight:"500"}}>Phone Number</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="08012345678" style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"8px",marginBottom:"16px"}} />
        
        <label style={{display:"block", marginBottom:"8px", fontWeight:"500"}}>Password</label>
        <div style={{position:"relative", marginBottom:"20px"}}>
          <input type={showPassword ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"8px"}} />
          <span onClick={()=>setShowPassword(!showPassword)} style={{position:"absolute", right:"12px", top:"12px", cursor:"pointer", color:"#666", fontSize:"14px"}}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        
        <button style={{width:"100%",padding:"14px",background:"black",color:"white",border:"none",borderRadius:"8px",fontWeight:"bold", cursor:"pointer"}}>Create Account</button>
      </form>
      
      {msg && <p style={{marginTop:"15px",padding:"12px",background: msg.includes("created") ? "#dcfce7" : "#fee2e2", color: msg.includes("created") ? "#16a34a" : "#dc2626", borderRadius:"8px", fontSize:"14px"}}>{msg}</p>}
    </div>
  )
}
