import { AUTH_DATA } from "@/store/auth"
import React, { createContext, useContext } from "react"

const AuthContext = createContext({})

export function AuthProvider({
  children,
}: {
  children: React.ReactNode; // Anotasi tipe untuk children
}) {
  return (
    <AuthContext.Provider value={AUTH_DATA}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => (useContext(AuthContext))