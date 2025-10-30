import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const register = (newUser) => {
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];
    const exists = users.find((u) => u.email === newUser.email);
    if (exists) return { ok: false, message: "Email already registered" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { ok: false, message: "Invalid credentials" };
    localStorage.setItem("currentUser", JSON.stringify(found));
    setUser(found);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const value = { user, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
