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
  dateCreated:"",
  itemList:[],
  photoList:new Array(5).fill(null)
}


export const cardContext = createContext(card)


export const CardContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(cardReducer,card)
  const [typesArray,setTypesArray] = useState([])
  const [photoModel,setPhotoModel] = useState(false)
  const [menuModel,setMenuModel] = useState(false)

  return (
    <cardContext.Provider value={{
      dispatch,cardProfile:state,setTypesArray,typesArray,photoModel,setPhotoModel,
      menuModel,setMenuModel
    }}>
      {children}
    </cardContext.Provider>
  )
}
