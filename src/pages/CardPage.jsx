import React,{useState,useEffect} from 'react'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import userAuth from '../hooks/userAuth'


const CardPage = () => {


  const {userProfile:{id}} = userAuth()
  const [typesArray,setTypesArray] = useState([])


  const[cardInfo,setCardInfo] = useState({
    title:"",
    facebookLink:"",
    instagramLink:"",
    whatsappLink:"",
    typeId:null,
    userId:id
  })

  console.log(cardInfo)
  
  useEffect(() => {
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

/*      

  

  const handleSubmit = (e)=>{
    const {title,email,password,location} = userInfo
    e.preventDefault()
    Axios.put(URL_PATH+'Users/'+userProfile.id,{name,email,password,location})
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("name is not unique")
          setNameIsUnique(false)
          break;
        case 0:
          console.log("couldn't add try agian later")
          setNameIsUnique(true)
          break;
        case 1:
          console.log("updated successfully")
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:userInfo})
          setNameIsUnique(true)
          break;
        default:
          console.log("success code not founded")
          break;
      }
    },(error)=>{
      console.log(error)
    }); 
  }
  */

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }

  return (
      <div className="sign-up-form">
        <h1>Create your card</h1>
        <form className="form-container">
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