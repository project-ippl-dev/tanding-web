import { AUTH_DATA } from "@/store/auth"
import { AuthData } from "@/types/auth.type";
import React, { createContext, useContext } from "react"

const AuthContext = createContext<AuthData>(AUTH_DATA)

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

export const useAuth = (): AuthData => useContext(AuthContext);