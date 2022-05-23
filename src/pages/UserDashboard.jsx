import React,{useContext,useState,useEffect} from 'react'
import {userContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'

const UserDashboard = () => {

  const {userProfile} = useContext(userContext)
  //console.log(userProfile)
 

  const[nameIsUnique,setNameIsUnique] = useState(true)
  const navigate = useNavigate()

  const[userInfo,setUserInfo] = useState({
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
    console.log("clicked")
    const {name,email,password,location} = userInfo
    e.preventDefault()
    Axios.put(URL_PATH+'Users',{name,email,password,location})
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
          console.log("added successfully")
          setNameIsUnique(true)
          navigate("/signin")
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
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h1>Edit your profile</h1>
        <div className="form-container">
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
        </div>
      </form>
  )
}

export default UserDashboard