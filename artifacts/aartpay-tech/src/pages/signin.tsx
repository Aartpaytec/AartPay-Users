import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Signin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignin = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('users').select('*').eq('phone', phone.trim()).eq('password', password).single()
    setLoading(false)
    if (error || !data) {
      alert('No account found with this phone')
    } else {
      alert('Login successful!')
      localStorage.setItem('user', JSON.stringify(data))
      window.location.href = '/dashboard'
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign In</h2>
      <input placeholder="Phone e.g 09169527575" value={phone} onChange={e => setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:10, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:10, width:'100%'}} />
      <button onClick={handleSignin} disabled={loading} style={{ padding:10, width:'100%'}}>{loading?'Checking...':'Sign In'}</button>
    </div>
  )
}
