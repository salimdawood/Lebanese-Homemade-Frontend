import React,{createContext,useReducer} from 'react'
import userReducer  from '../reducer/userReducer'


const user = {
  id:null,
  name:null,
  email:null,
  location:null,
  password:null,
  cardList:[]
}


export const userContext = createContext(user)


export const UserContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(userReducer,user)

  return (
    <userContext.Provider value={{dispatch,userProfile:state}}>
      {children}
    </userContext.Provider>
  )
}
