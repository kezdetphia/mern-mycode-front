import { useContext  } from "react";
import { CodeContext} from '../context/CodesContext'

export const useCodesContext = ()=>{
  if(!contex) throw new Error ('useCodesContext must be used inside CodesContextProvider')
  return context
}