import React,{createContext,useReducer} from 'react'
import homeReducer  from '../reducer/homeReducer'


const home = {
  perPage:10,
  currentPage:1,
  typeId:""
}


export const homeContext = createContext(home)


export const HomeContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(homeReducer,home)

  return (
    <homeContext.Provider value={{dispatch,home:state}}>
      {children}
    </homeContext.Provider>
  )
}
