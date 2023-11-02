import {createContext, useReducer} from 'react'

export const CodesContext = createContext()

export const codesReducer=(state, action)=>{
  switch(action.type) {
    case 'SET_CODE': return {codes: action.payload}

    case 'CREATE_CODE': return {codes: [action.payload, ...state.codes]}

    case 'DELETE_CODE': return (
      {codes: state.codes.filter(code => code._id !== action.payload._id)}
    )
        
    default: return state
  }
}


export const CodesContextProvider=({children})=>{
  const [state, dispatch] = useReducer(codesReducer, {codes: []})

  return(
    <CodesContext.Provider value={{...state, dispatch}}>
      {children}
    </CodesContext.Provider>
  )
}




