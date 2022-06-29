import React,{useState} from 'react'
import FormInput from './FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import useAuth from '../hooks/useAuth'

const UserDashboard = () => {

  const {userProfile,dispatch,toggleCardsGallery} = useAuth()
 

  const[nameIsUnique,setNameIsUnique] = useState(true)

  const[userInfo,setUserInfo] = useState({
    id:userProfile.id,
    name:userProfile.name,
    email:userProfile.email,
    password:userProfile.password,
    confirmPassword:userProfile.password,
    location:userProfile.location
  })

  const userInfoInput = [
    {
      id:1,
      name:"name",
      type:"text",
      placeholder:"Enter your name",
      errorMessage:"User name should be between 3-16 characters, and should include only letters and numbers.",
      required:true,
      label:"Username *",
      pattern:"^[a-zA-Z0-9]{3,16}$"
    },
    {
      id:2,
      name:"email",
      type:"email",
      placeholder:"Enter your email",
      errorMessage:"You didn't enter a valid email.",
      required:true,
      label:"Email *"
    },
    {
      id:3,
      name:"password",
      type:"password",
      placeholder:"Enter your password",
      errorMessage:"Password should be between 8-20 characters, and must include at least: one letter,one number, and one special character.",
      required:true,
      label:"Password *",
      pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`
    },
    {
      id:4,
      name:"confirmPassword",
      type:"password",
      placeholder:"Confirm your password",
      errorMessage:"Passwords doesn't match.",
      required:true,
      label:"Confirm Password *", 
      pattern:userInfo.password
    },
    {
      id:5,
      name:"location",
      type:"text",
      placeholder:"Enter your shop location",
      errorMessage:"Shop location should be 3-20 characters",
      required:false,
      label:"Shop Location",
      pattern:"^[a-zA-Z]{3,20}$"
    }
  ]
  
  const handleSubmit = (e)=>{
    const {name,email,password,location} = userInfo
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
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{...userInfo,cardList:userProfile.cardList}})
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

  const handleChange =(e)=>{
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  return (
      <div className="sign-up-form">
        <h1>Edit your profile</h1>
        <form onSubmit={handleSubmit} className="form-container">
          {!nameIsUnique && <span className="db-warning">Username must be unique *.</span>}
          {
            userInfoInput.map((input)=>(
              <FormInput
              key={input.id}
              {...input}
              value={userInfo[input.name]}
              onChange={handleChange} />
            ))
          }
          <input type="submit" value="Edit" />
        </form>
        <input type="submit" value="Manage cards" onClick={toggleCardsGallery}/>
      </div>
  )
}

export default UserDashboard
//add icon(arrow) to input manage cards to inform user on  cards gallery toggle action