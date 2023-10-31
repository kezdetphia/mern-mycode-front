import {createContext, useReducer} from 'react'

export const CodesContext = createContext()


export const codesReducer=(state, action)=>{
  switch(action.type) {
    case 'SET_CODES': return {codes: action.payload}

    case 'CREATE_WORKOUT': return {codes: [action.payload, ...state.codes]}

    case 'DELETE_WORKOUT': return (
      {codes: state.codes.filter(code => code._id !== action.payload._id)}
    )
    case 'EDIT_WORKOUT': return 
      {codes: state.codes.map(code => {
        if (code._id === action.paylod._id){
          return {...code, ... action.payload.editedCode }
        }else{
          return code
        }
      }) }
    default: return state
  }
}




export const CodesContextProvider=({children})=>{
  const [state, dispatch] = useReducer(codesReducer, {codes: null})

  return(
    <CodesContext.Provider value={null}>
      {children}
    </CodesContext.Provider>
  )
}



