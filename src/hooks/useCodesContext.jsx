// useCodesContext.jsx
import { useContext } from "react";
import { CodesContext } from "../context/CodesContext";

export const useCodesContext = () => {

  const context = useContext(CodesContext);

  if (!context) {
    throw new Error(
      "useCodesContext must be used inside  CodesContextProvider"
    );
  }
  return context;
};

