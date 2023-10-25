import { useContext, useReducer } from "react";

const AuthContext = useContext();

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

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  console.log("Authcontext State: ", state);

  return(
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
    )
};
