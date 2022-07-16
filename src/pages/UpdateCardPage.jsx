import React,{useState,useContext} from 'react'
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


const UpdateCardPage = ({types}) => {

  const navigate = useNavigate()
  const {userProfile,dispatch} = useAuth()
  const {setPhotoModel,setMenuModel} = useContext(cardContext)
  const {setNotification,closeNotification} = useContext(notificationContext)

   //put inside use effect
  const cardProfile = sessionStorage.getItem("card")?
  JSON.parse(sessionStorage.getItem("card")) : {} 

  const[cardInfo,setCardInfo] = useState({
    id:cardProfile.id || "",
    title:cardProfile.title || "",
    facebookLink:cardProfile.faceBookLink || "",
    instagramLink:cardProfile.instagramLink || "",
    whatsappLink:cardProfile.whatsAppLink || "",
    typeId:cardProfile.typeId || ""
  })

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }
    
  //change from add to update
  const updateCard = async(e)=>{

    e.preventDefault()

    const cardInfoCopy = {...cardInfo}
    for(var info in cardInfoCopy){
      if(cardInfoCopy[info].length===0){
        cardInfoCopy[info] = null
      }
    }

    try {
      const result = await Axios.put(URL_PATH+`Cards/${cardInfo.id}`,cardInfoCopy)
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
        default:
          console.log("card added successfully")
          cardInfo.type = types.filter(type=>type.id == cardInfo.typeId)[0].name
          dispatch({type:'UPDATE_USER_CARD',cardInfo})
          setNotification({isShown:true,message:"Card was updated successfully",color:"green"})
          closeNotification()
          navigate(`/user/${userProfile.id}`)
          break;
        }
    } catch (error) {
      console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }
  }

  const deleteCard = async ()=>{
    Axios.delete(URL_PATH+'Cards/'+cardInfo.id)
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          setNotification({isShown:true,message:"Unable to delete the card",color:"red"})
          closeNotification()
          break;
        case 1:
          console.log("card deleted successfully")
          setNotification({isShown:true,message:"Card was deleted successfully",color:"green"})
          closeNotification()
          navigate(`/user/${userProfile.id}`)
          dispatch({type:'DELETE_CARD',id:cardInfo.id})
          break;
        default:
          console.log("code not recognized")
          break;
      }
    },(error)=>{
      console.log(error)
    });
  }

  return (
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
          <SelectType defaultValue={cardInfo.typeId} handleChange={handleChange} typesArray={types}/>
          <input type="submit" value="Update" />
        </form>
        <input type="submit" value="Manage photos" onClick={()=>setPhotoModel(true)}/>
        <input type="submit" value="Manage menu" onClick={()=>setMenuModel(true)}/>
        <input type="submit" value="Delete card" className="delete-btn" onClick={deleteCard}/>
      </div>
  )
}

export default UpdateCardPage