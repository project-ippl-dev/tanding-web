import React, { createContext, useContext } from "react"

interface LoadingContextType {
  state: boolean; // Anotasi tipe untuk state
  changeState?: (value: boolean) => void; // Anotasi tipe untuk changeState
}

const LoadingContext = createContext<LoadingContextType>({
  state: false, // Nilai default untuk state
  changeState: undefined, // Nilai default untuk changeState
})

export function LoadingProvider({
  initialValue = false,
  changeState,
  children,
}: {
  initialValue?: boolean; // Anotasi tipe untuk initialValue
  changeState?: (value: boolean) => void; // Anotasi tipe untuk changeState
  children: React.ReactNode; // Anotasi tipe untuk children
}) {
  return (
    <LoadingContext.Provider value={{state: initialValue, changeState: changeState}}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = (): LoadingContextType => useContext(LoadingContext);