import { useAuthContext } from "./useAuthContext";
import {useWorkoutsContext} from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch : workoutsDispatch} = useWorkoutsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action  
    dispatch({type: 'LOGOUT',} )
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    console.log('User logget out')

  };
  return {logout}
};
