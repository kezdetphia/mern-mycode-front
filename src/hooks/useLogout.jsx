import { useAuthContext } from "./useAuthContext";
import {useCodesContext} from './useCodesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: codesDispatch } = useCodesContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action  
    dispatch({type: 'LOGOUT',} )
    codesDispatch({ type: "SET_CODE", payload: null });
    console.log('User logget out')

  };
  return {logout}
};
