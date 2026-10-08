import { useState } from 'react'

const supabaseUrl = 'https://qbsqgoicgcwtvxtvccsr.supabase.co'
const supabaseKey = 'sb_publishable_Ub3sy5ZxoSA4c298rCXm3Q_i8gIslnK'

export default function Signin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignin = async () => {
    if (!phone ||!password) { alert('Fill all'); return }
    setLoading(true)
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/users?phone=eq.${phone.trim()}&password=eq.${password}&select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })
      const data = await res.json()
      if (!res.ok ||!data || data.length === 0) throw new Error('No account found')
      localStorage.setItem('user', JSON.stringify(data[0]))
      alert('Welcome '+data[0].name)
      window.location.href = '/dashboard'
    } catch (e:any) {
      alert('Login failed: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Sign In - AartPay</h2>
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <button onClick={handleSignin} disabled={loading} style={{ padding:12, width:'100%', background:'black', color:'white' }}>{loading?'Checking...':'Sign In'}</button>
    </div>
  )
}
