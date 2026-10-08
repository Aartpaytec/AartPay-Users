import { useState } from 'react'

const supabaseUrl = 'https://qbsqgoicgcwtvxtvccsr.supabase.co'
const supabaseKey = 'sb_publishable_Ub3sy5ZxoSA4c298rCXm3Q_i8gIslnK'

export default function Signup() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name ||!phone ||!password) { alert('Fill all fields'); return }
    setLoading(true)
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')
      alert('Account created! Now login')
      window.location.href = '/signin'
    } catch (e:any) {
      alert('Error: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Sign Up - AartPay</h2>
      <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <button onClick={handleSignup} disabled={loading} style={{ padding:12, width:'100%', background:'black', color:'white' }}>{loading?'Saving...':'Sign Up'}</button>
    </div>
  )
}
