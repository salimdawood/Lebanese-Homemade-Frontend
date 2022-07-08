import React,{useState,useEffect,useContext} from 'react'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { cardContext } from '../context/cardContext'
import {notificationContext} from '../context/notificationContext'


const UpdateCardPage = () => {

  const navigate = useNavigate()
  const {userProfile,dispatch} = useAuth()
  const {typesArray,setPhotoModel,setMenuModel} = useContext(cardContext)
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

  const cardInfoInput = [
    {
      id:1,
      name:"title",
      type:"text",
      placeholder:"Enter your card title",
      errorMessage:"Title should be between 5-30 characters, and should include only letters and numbers.",
      required:true,
      label:"Title *",
      pattern:"^[a-zA-Z0-9]{5,30}$"
    },
    {
      id:2,
      name:"facebookLink",
      type:"text",
      placeholder:"Link to your shop's facebook page",
      label:"Facebook link"
    },
    {
      id:3,
      name:"instagramLink",
      type:"text",
      placeholder:"Link to your shop's instagram page",
      label:"Instagram link"
    },
    {
      id:4,
      name:"whatsappLink",
      type:"text",
      placeholder:"Link to your shop's whatsapp page",
      label:"Whatsapp link"
    }
  ]

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }
    
  //change from add to update
  const updateCard = (e)=>{
    e.preventDefault()
    Axios.put(URL_PATH+`Cards/${cardInfo.id}`,cardInfo)
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          setNotification({isShown:true,message:"Unable to delete the card",color:"red"})
          closeNotification()
          break;
        default:
          console.log("card added successfully")
          cardInfo.type = typesArray.filter(type=>type.id == cardInfo.typeId)[0].name
          dispatch({type:'UPDATE_USER_CARD',cardInfo})
          setNotification({isShown:true,message:"Card was updated successfully",color:"green"})
          closeNotification()
          navigate(`/user/${userProfile.id}`)
          break;
        }
    },(error)=>{
      console.log(error)
    }); 
  }

  const deleteCard = ()=>{
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
  const updatePhotos = () =>{
    setPhotoModel(true)
  }
  const updateMenu = () =>{
    setMenuModel(true)
  }

  return (
      <div className="sign-up-form">
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
          <select
            defaultValue={cardInfo.typeId}
            name="typeId"
            onChange={handleChange}
            required
          >
            <option value="" disabled >Card Type *</option>
            {
              typesArray.map((type)=>(
                <option key={type.id} value={type.id}>{type.name}</option>
              ))
            }
          </select>
          <input type="submit" value="Update" />
        </form>
        <input type="submit" value="Manage photos" onClick={updatePhotos}/>
        <input type="submit" value="Manage menu" onClick={updateMenu}/>
        <input type="submit" value="Delete card" className="delete-btn" onClick={deleteCard}/>
      </div>
  )
}

export default UpdateCardPage