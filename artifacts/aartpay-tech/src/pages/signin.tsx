import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Signin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignin = async () => {
    if (!phone || !password) { alert('Fill all'); return }
    setLoading(true)
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone.trim())
      .eq('password', password)
      .single()
    setLoading(false)
    
    if (error || !data) {
      alert('No account found — check phone/password')
    } else {
      localStorage.setItem('user', JSON.stringify(data))
      alert('Login successful!')
      window.location.href = '/dashboard'
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Sign In</h2>
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <button onClick={handleSignin} disabled={loading} style={{ padding:12, width:'100%', background:'#000', color:'#fff'}}>
        {loading?'Checking...':'Sign In'}
      </button>
      <p><a href="/signup">No account? Sign Up</a></p>
    </div>
  )
}
