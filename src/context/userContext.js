import React,{createContext,useReducer,useState} from 'react'
import userReducer  from '../reducer/userReducer'


const user = sessionStorage.getItem("userProfile")? JSON.parse(sessionStorage.getItem("userProfile")) :
{
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
  
  const [showCardsGallery,setShowCardsGallery] = useState(false)
  const toggleCardsGallery = () =>{
    setShowCardsGallery(!showCardsGallery)
  }

  return (
    <userContext.Provider value={{dispatch,userProfile:state,toggleCardsGallery,showCardsGallery}}>
      {children}
    </userContext.Provider>
  )
}
