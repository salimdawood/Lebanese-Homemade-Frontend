import React,{useState,useContext} from 'react'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { cardContext } from '../context/cardContext'
import {notificationContext} from '../context/notificationContext'
import SelectType from '../components/SelectType'

const AddCardPage = ({types}) => {
  
  const navigate = useNavigate()
  const {userProfile,dispatch} = useAuth()
  const {setMenuModel,setPhotoModel,cardProfile} = useContext(cardContext)
  const {setNotification,closeNotification} = useContext(notificationContext)

  const[cardInfo,setCardInfo] = useState({
    title:"",
    facebookLink:"",
    instagramLink:"",
    whatsappLink:"",
    typeId:"",
    userId:userProfile.id
  })

  const cardInfoInput = [
    {
      id:1,
      name:"title",
      type:"text",
      placeholder:"Enter your card title",
      errorMessage:"Title should be between 3-30 characters, and should include only letters,numbers,',and spaces",
      required:true,
      label:"Title *",
      pattern:"^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 ']{3,30}$"
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
      type:"tel",
      pattern:"[0-9]{8}",
      errorMessage:"Numbers only allowed(ex:81123456)",
      placeholder:"Shop whatsapp number",
      label:"Whatsapp number"
    }
  ]
    
  const addCard = (e)=>{
    e.preventDefault()

    let formData = new FormData()

    //search for better solution,way of send and recieve
    //card basic info
    for ( var info in cardInfo ) {
      formData.append(info, cardInfo[info]);
    }
    //card photos
    for(let i=0;i<cardProfile.photoList.length;i++){
      if(cardProfile.photoList[i] !== null){
        formData.append('photoList', cardProfile.photoList[i])
      }
    }
    //card menu
    for(let i=0;i<cardProfile.itemList.length;i++){
      formData.append('itemList', JSON.stringify(cardProfile.itemList[i]))
    }
    //print the form
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    
    Axios({
      method: "post",
      url: URL_PATH+'Cards',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
        default:
          console.log("card added successfully")
          setNotification({isShown:true,message:"Card added successfully",color:"green"})
          closeNotification()
          navigate(`/user/${userProfile.id}`)
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{
            ...userProfile,
            cardList:[...userProfile.cardList,{
              id:result.data,
              title:cardInfo.title,
              //better way???better solution
              type:types.filter(type=>type.id == cardInfo.typeId)[0].name,
              //better date format
              dateCreated: new Date()
            }]}
          })
          break;
        }
    },(error)=>{
      console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }); 
  }

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }

  const openMenuModel = () =>{
    setMenuModel(true)
  }

  const openPhotoModel = () =>{
    setPhotoModel(true)
  }

  return (
      <div className="sign-up-form">
        <h1>Create your card</h1>
        <form onSubmit={addCard} className="form-container">
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
          <SelectType defaultValue={cardInfo.typeId} handleChange={handleChange} typesArray={types}/>
          <input type="submit" value="Create" />
        </form>
        <input type="submit" onClick={openMenuModel} value="Manage menu" />
        <input type="submit" onClick={openPhotoModel} value="Add photos" />
      </div>
  )
}

export default AddCardPage