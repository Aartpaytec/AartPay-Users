import { useState } from "react"
export default function Signup(){
  const [name,setName]=useState("")
  const [phone,setPhone]=useState("")
  const [msg,setMsg]=useState("")
  const onSubmit=(e:any)=>{
    e.preventDefault()
    const users=JSON.parse(localStorage.getItem("aartpay_users")||"[]")
    users.push({name,phone,id:Date.now()})
    localStorage.setItem("aartpay_users",JSON.stringify(users))
    setMsg("Account created!")
    setName(""); setPhone("")
  }
  return (
    <div style={{padding:"40px 20px",maxWidth:"400px",margin:"50px auto",background:"white",borderRadius:"12px"}}>
      <h1 style={{fontSize:"24px",fontWeight:"bold",marginBottom:"20px"}}>Create Account</h1>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" required style={{width:"100%",padding:"12px",marginBottom:"12px",border:"1px solid #ccc",borderRadius:"8px"}}/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" required style={{width:"100%",padding:"12px",marginBottom:"12px",border:"1px solid #ccc",borderRadius:"8px"}}/>
        <button style={{width:"100%",padding:"12px",background:"black",color:"white",borderRadius:"8px"}}>Sign Up</button>
      </form>
      {msg && <p style={{marginTop:"15px",color:"green",textAlign:"center"}}>{msg}</p>}
    </div>
  )
}
