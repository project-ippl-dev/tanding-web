import { Backdrop, CircularProgress } from "@mui/material";
import React, { createContext, useContext } from "react"

interface LoadingContextType {
  state: boolean; // Anotasi tipe untuk state
  changeState: (value: boolean) => void; // Anotasi tipe untuk changeState
}

const LoadingContext = createContext<LoadingContextType>({
  state: false, // Nilai default untuk state
  changeState: ()=>{}, // Nilai default untuk changeState
})

export function LoadingProvider({
  initialValue = false,
  children,
}: {
  initialValue?: boolean; // Anotasi tipe untuk initialValue
  changeState?: (value: boolean) => void; // Anotasi tipe untuk changeState
  children: React.ReactNode; // Anotasi tipe untuk children
}) {
  const [loading, setLoading] = React.useState<boolean>(initialValue);
  const loadingElement = (
    <Backdrop
      open={loading}
      data-testid="backdrop-loading"
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1000,
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparent background
      }}
    >
      <CircularProgress
        color="inherit" />
    </Backdrop>
  );
  return (
    <LoadingContext.Provider value={{state: loading, changeState: setLoading}}>
      {children}
      {loadingElement}
    </LoadingContext.Provider>
  );
}

export const useLoading = (): LoadingContextType => useContext(LoadingContext);