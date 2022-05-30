import React,{createContext,useReducer,useState} from 'react'
import cardReducer  from '../reducer/cardReducer'


const card = sessionStorage.getItem("cardProfile")? JSON.parse(sessionStorage.getItem("cardProfile")) :
 {
  id:null,
  title:"",
  type:"",
  faceBookLink:"",
  instagramLink:"",
  whatsAppLink:"",
  dateCreated:""
}


export const cardContext = createContext(card)


export const CardContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(cardReducer,card)
  const [typesArray,setTypesArray] = useState([])

  return (
    <cardContext.Provider value={{dispatch,cardProfile:state,setTypesArray,typesArray}}>
      {children}
    </cardContext.Provider>
  )
}
