import React,{useState,useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
//components
import FormInput from '../components/FormInput'
import SelectType from '../components/SelectType'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//custom hooks
import useAuth from '../hooks/useAuth'
//context
import { cardContext } from '../context/cardContext'
import {notificationContext} from '../context/notificationContext'
//input form
import {cardInfoInput} from '../constantVariables/cardInfoInput'
//components
import Loading from '../components/Loading'


const UpdateCardPage = ({types}) => {

  //notificatin for better ui
  const [isLoading,setIsLoading] = useState(false)
  const {setNotification,closeNotification} = useContext(notificationContext)

  const navigate = useNavigate()
  const {userProfile,dispatch} = useAuth()
  const {setPhotoModel,setMenuModel} = useContext(cardContext)

  const cardProfile = JSON.parse(sessionStorage.getItem("card"))

  const[cardInfo,setCardInfo] = useState(()=>{
    return cardProfile?
    {
      id:cardProfile.id || "",
      title:cardProfile.title || "",
      facebookLink:cardProfile.faceBookLink || "",
      instagramLink:cardProfile.instagramLink || "",
      whatsappLink:cardProfile.whatsAppLink || "",
      typeId:cardProfile.type.id || "-1"
    }
    :
    {
      id:"",
      title:"",
      facebookLink:"",
      instagramLink:"",
      whatsappLink:"",
      typeId:"-1"
    }
  })

  useEffect(() => {
    //console.log("triggered")
    if(cardInfo.id === '') navigate(`/user/${userProfile.id}`)
  },[cardInfo.id])
  

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }
    
  //change from add to update
  const updateCard = async(e)=>{

    e.preventDefault()

    setIsLoading(true)
    const cardInfoCopy = {...cardInfo}
    //clean input before sending
    for(var info in cardInfoCopy){
      if(cardInfoCopy[info].length===0){
        cardInfoCopy[info] = null
      }
    }
    try {
      const result = await Axios.put(URL_PATH+`Cards/${cardInfo.id}`,cardInfoCopy)
      //console.log(result)
      switch (result.data) {
        case -2:
          //console.log("data failed server validation")
          setIsLoading(false)
          setNotification({isShown:true,message:"Please respect data validation",color:"red"})
          closeNotification()
          break;
        case 0:
          //console.log("something went wrong")
          setIsLoading(false)
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
        case 1:
          //console.log("card added successfully")
          setIsLoading(false)
          cardInfo.type = cardProfile.type.name
          dispatch({type:'UPDATE_USER_CARD',cardInfo})
          setNotification({isShown:true,message:"Card was updated successfully",color:"green"})
          closeNotification()
          navigate(`/user/${userProfile.id}`)
          break;
        default:
          //console.log("something went wrong")
          setIsLoading(false)
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
        }
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }
  }

  const deleteCard = async ()=>{
    setIsLoading(true)
    try {
      const result = await Axios.delete(URL_PATH+'Cards/'+cardInfo.id)
      //console.log(result)
      switch (result.data) {
        case 0:
          //console.log("something went wrong")
          setIsLoading(false)
          setNotification({isShown:true,message:"Unable to delete the card",color:"red"})
          closeNotification()
          break;
        case 1:
          //console.log("card deleted successfully")
          setIsLoading(false)
          setNotification({isShown:true,message:"Card was deleted successfully",color:"green"})
          closeNotification()
          dispatch({type:'DELETE_CARD',id:cardInfo.id})
          navigate(`/user/${userProfile.id}`)
          break;
        default:
          //console.log("code not recognized")
          setIsLoading(false)
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
      }      
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }
  }

  const select_type_props = {
    defaultValue:cardInfo.typeId,
    handleChange:handleChange,
    typesArray:types
  }

  return (
    <>
      {isLoading && <Loading/>}
      <div className="form">
        <h1>Update your card</h1>
        <form onSubmit={updateCard} className="form-container">
          {
            cardInfoInput.map((input)=>(
              <FormInput
              key={input.id}
              {...input}
              value={cardInfo[input.name]}
              onChange={handleChange} />
            ))
          }
          <label>Card type *</label>
          <SelectType {...select_type_props}/>
          <input type="submit" value="Update" />
        </form>
        <input type="submit" value="Manage photos" onClick={()=>setPhotoModel(true)}/>
        <input type="submit" value="Manage menu" onClick={()=>setMenuModel(true)}/>
        <input type="submit" value="Delete card" className="delete-btn" onClick={deleteCard}/>
      </div>
    </>
  )
}

export default UpdateCardPage