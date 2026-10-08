import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert('Signup successful! Check your email to confirm.')
      console.log(data)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign Up</h2>
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        style={{ display: 'block', marginBottom: 10, padding: 8, width: '100%' }}
      />
      <input 
        placeholder="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        style={{ display: 'block', marginBottom: 10, padding: 8, width: '100%' }}
      />
      <button onClick={handleSignup} disabled={loading}>
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </div>
  )
}
