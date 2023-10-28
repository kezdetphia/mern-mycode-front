import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(()=>{
    // if there's a user in localStorage, log in user
    // this will prevent front-end user:null when refreshing page
    const user = JSON.parse(localStorage.getItem('user'))
    if (user){
      dispatch({type: "LOGIN", payload: user})
    }
  },[])

  console.log("Authcontext State: ", state);

  return(
    <AuthContext.Provider value = {{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
    )
};
