import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action  
    dispatch({type: 'LOGOUT',} )
    console.log('User logget out')
  };
  return {logout}
};
