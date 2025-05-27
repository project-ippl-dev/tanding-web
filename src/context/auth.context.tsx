"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthData } from "@/types/auth.type";
import { authLogin, authLogout } from "@/store/actions/auth";
import { AUTH_DATA } from "@/store/auth";

interface AuthContextType {
  authData: AuthData | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  // Restore previous session from localStorage, if any
  useEffect(() => {
    const stored = localStorage.getItem("authData");
    if (stored) setAuthData(JSON.parse(stored));
  }, []);

  const login = async (username: string, password: string) => {
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_TANDING_API_BASE_URL}/auth/login`,
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    //   }
    // );
    console.log("login Called");
    try {
      const res = await authLogin(username, password);
      // const result: { message: string; data: AuthData } = await res.json();
      const result: { message: string; data: AuthData } = res;
      console.log(result);
      setAuthData(result.data);
      localStorage.setItem("authData", JSON.stringify(result.data));
    } catch (e) {
      throw e;
    }
    // if (!res.ok) {
    //   const err = await res.json();
    //   throw new Error(err.message || "Login failed");
    // }
  };

  const logout = async () => {
    await authLogout();
    setAuthData(null);
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        logout,
        isAuthenticated: Boolean(authData),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
