import { useContext } from "react";
import { AuthContext } from "../hooks/Use";

export const useAuthContext = () => {
  
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside a AuthContextProvider");
  }
  return context;
};
