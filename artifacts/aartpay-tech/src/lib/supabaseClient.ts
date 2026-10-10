import { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
const AuthContext = createContext<any>(null!);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    const s = localStorage.getItem("aartpay_user");
    return s ? JSON.parse(s) : null;
  });
  const register = async (phone: string, email: string, password: string, name: string) => {
    const { data, error } = await supabase.from("users").insert([{ phone, email, name, password }]).select();
    if (error) throw new Error(error.message);
    const u = { phone, email, name };
    setUser(u);
    localStorage.setItem("aartpay_user", JSON.stringify(u));
    return data;
  };
  const login = async (phone: string, password: string) => {
    const { data, error } = await supabase.from("users").select("*").eq("phone", phone).eq("password", password).single();
    if (error || !data) throw new Error("Phone or password wrong");
    const u = { phone: data.phone, email: data.email, name: data.name };
    setUser(u);
    localStorage.setItem("aartpay_user", JSON.stringify(u));
    return data;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("aartpay_user");
  };
  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}
