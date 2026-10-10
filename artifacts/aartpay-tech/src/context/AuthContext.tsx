import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem("aartpay_user")
      return saved? JSON.parse(saved) : null
    } catch { return null }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("aartpay_user", JSON.stringify(user))
    }
  }, [user])

  const register = async (phone: string, email: string, password: string, name: string) => {
    // 1. Insert
    const { data, error } = await supabase.from("users").insert([{ phone, email, name, password }]).select().single()
    if (error) throw error
    // 2. AUTO LOGIN IMMEDIATELY - THIS FIXES YOUR NO 2
    setUser(data)
    localStorage.setItem("aartpay_user", JSON.stringify(data))
    return data
  }

  const login = async (phone: string, password: string) => {
    const { data, error } = await supabase.from("users").select("*").eq("phone", phone).eq("password", password).single()
    if (error ||!data) throw new Error("Wrong phone or password")
    setUser(data)
    localStorage.setItem("aartpay_user", JSON.stringify(data))
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aartpay_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
