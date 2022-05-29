import React,{useState,useEffect} from 'react'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import userAuth from '../hooks/userAuth'
import { useNavigate } from 'react-router-dom'


const CardPage = () => {


  const {userProfile,dispatch} = userAuth()
  const [typesArray,setTypesArray] = useState([])


  const[cardInfo,setCardInfo] = useState({
    title:"",
    facebookLink:"",
    instagramLink:"",
    whatsappLink:"",
    typeId:null,
    userId:userProfile.id
  })

  const navigate = useNavigate()

  console.log(cardInfo)
  
  useEffect(() => {
    //fix calling too much unnecessary
    console.log("clicked")
    Axios.get(URL_PATH+'Types/')
    .then((result)=>{
      console.log(result)
      setTypesArray([...result.data])
    },(error)=>{
      console.log(error)
    }); 
  },[])

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
    
  const handleSubmit = (e)=>{
    e.preventDefault()
    Axios.post(URL_PATH+'Cards',cardInfo)
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          break;
        case 1:
          console.log("card added successfully")
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{
            ...userProfile,
            cardList:[...userProfile.cardList,{
              title:cardInfo.title,
              //find better solution for type match
              type:typesArray.filter(type=>type.id == cardInfo.typeId)[0].name,
              dateCreated: Date().toLocaleString()
            }]}
          })
          navigate(`/user/${userProfile.id}`)
          break;
        default:
          console.log("success code not founded")
          break;
      }
    },(error)=>{
      console.log(error)
    }); 
  }

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }

  return (
      <div className="sign-up-form">
        <h1>Create your card</h1>
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
            defaultValue=""
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
          <input type="submit" value="Create" />
        </form>
      </div>
  )
}

export default CardPage