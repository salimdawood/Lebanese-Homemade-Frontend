import React,{useState,useEffect,useContext} from 'react'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import userAuth from '../hooks/userAuth'
import { useNavigate } from 'react-router-dom'
import { cardContext } from '../context/cardContext'


const UpdateCardPage = () => {


  const {userProfile,dispatch} = userAuth()
  const {cardProfile,dispatch:cardDispatch,typesArray} = useContext(cardContext)

  const[cardInfo,setCardInfo] = useState({
    id:cardProfile.id,
    title:cardProfile.title || "",
    facebookLink:cardProfile.faceBookLink || "",
    instagramLink:cardProfile.instagramLink || "",
    whatsappLink:cardProfile.whatsAppLink || "",
    typeId:typesArray.filter(type=>type.name === cardProfile.type)[0].id,
    userId:userProfile.id
  })

  const navigate = useNavigate()

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
    
  //change from add to update
  const handleSubmit = (e)=>{
    e.preventDefault()
    Axios.post(URL_PATH+'Cards',cardInfo)
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          break;
        default:
          console.log("card added successfully")
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{
            ...userProfile,
            cardList:[...userProfile.cardList,{
              id:result.data,
              title:cardInfo.title,
              //better way???better solution
              type:typesArray.filter(type=>type.id == cardInfo.typeId)[0].name,
              dateCreated: Date()
            }]}
          })
          cardInfo.id=result.data
          navigate(`/user/${userProfile.id}`)
          break;
        }
    },(error)=>{
      console.log(error)
    }); 
  }

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }

  const deleteCard = ()=>{
    Axios.delete(URL_PATH+'Cards/'+cardInfo.id)
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          break;
        case 1:
          console.log("card deleted successfully")
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
      <div className="sign-up-form">
        <h1>Update your card</h1>
        <form onSubmit={handleSubmit} className="form-container">
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
            <option value="" disabled >Card Type</option>
            {
              typesArray.map((type)=>(
                <option key={type.id} value={type.id}>{type.name}</option>
              ))
            }
          </select>
          <input type="submit" value="Update" />
        </form>
        <input type="submit" value="Delete card" className="delete-btn" onClick={deleteCard}/>
      </div>
  )
}

export default UpdateCardPage