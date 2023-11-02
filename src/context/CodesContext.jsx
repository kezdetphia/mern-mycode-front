import {createContext, useReducer} from 'react'

export const CodesContext = createContext()

export const codesReducer=(state, action)=>{
  switch(action.type) {
    case 'SET_CODE': return {codes: action.payload}

    case 'CREATE_CODE': return {codes: [action.payload, ...state.codes]}

    case 'DELETE_CODE': return (
      {codes: state.codes.filter(code => code._id !== action.payload._id)}
    )
    
    case 'GET_ONE_CODE': 
      const foundCode = state.codes.filter(code => code._id == action.payload._id)
      return foundCode ? {code: foundCode} : state
    
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




