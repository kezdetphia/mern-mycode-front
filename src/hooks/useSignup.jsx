import {useState} from 'react';
import {useAuthContext} from './useAuthContext'


export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (signUpDetails)=>{
    setIsLoading(true);
    setError(null);

    try{
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetails),
      });
      const json = await response.json();
    
      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }
      if (response.ok){
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
    
        // update the auth context
        dispatch({type: 'LOGIN', payload: json })
      }
    }catch(error){
      setError('An error occured during signup')
    } finally {
      setIsLoading(false)
    }
  }
  
  return { signup, isLoading, error };
}



