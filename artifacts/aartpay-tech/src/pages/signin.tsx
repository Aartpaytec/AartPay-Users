import { useState } from "react"

export default function SignIn() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = () => {
    if (!phone || !password) {
      alert("Please enter phone and password")
      return
    }
    const users = JSON.parse(localStorage.getItem("aartpay_users") || "[]")
    const user = users.find((u: any) => u.phone === phone)
    
    if (!user) {
      alert("No account found with this phone. Please Sign Up first.")
      return
    }
    if (user.password !== password) {
      alert("Incorrect password!")
      return
    }
    alert("Login successful! Welcome " + user.name)
    window.location.href = "/"
  }

  return (
    <div style={{ minHeight: "100vh", background: "white", padding: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center" }}>Welcome Back</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>Sign in to your AartPay account</p>

        <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Phone Number</label>
        <input 
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "16px" }}
        />

        <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Password</label>
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}
          />
          <span 
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "12px", top: "12px", color: "#007AFF", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button 
          onClick={handleSignIn}
          style={{ width: "100%", background: "black", color: "white", padding: "14px", borderRadius: "8px", border: "none", fontWeight: "bold" }}
        >
          Sign In
        </button>

        <p style={{ textAlign: "center", marginTop: "16px", color: "#666", fontSize: "14px" }}>
          Don't have account? <a href="/signup" style={{ color: "black", fontWeight: "bold" }}>Create Account</a>
        </p>
      </div>
    </div>
  )
}
