import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = { phone: string; email?: string; name: string };
type AuthContextType = {
  user: User | null;
  login: (phone: string, pass: string) => boolean;
  register: (data: User & { pass: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("aartpay_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (phone: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem("aartpay_users") || "[]");
    const found = users.find((u: any) => u.phone === phone && u.pass === pass);
    if (found) {
      const u = { phone: found.phone, email: found.email, name: found.name };
      setUser(u);
      localStorage.setItem("aartpay_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const register = (data: User & { pass: string }) => {
    const users = JSON.parse(localStorage.getItem("aartpay_users") || "[]");
    users.push(data);
    localStorage.setItem("aartpay_users", JSON.stringify(users));
    const u = { phone: data.phone, email: data.email, name: data.name };
    setUser(u);
    localStorage.setItem("aartpay_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aartpay_user");
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
