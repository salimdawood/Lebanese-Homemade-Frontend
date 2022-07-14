import React,{useState,useContext} from 'react'
//components
import FormInput from './FormInput'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//custom hooks
import useAuth from '../hooks/useAuth'
//context
import {notificationContext} from '../context/notificationContext'
//input for form
import userInfoInput from '../constantVariables/userInfoInput'

const UserDashboard = () => {

  const {userProfile,dispatch,toggleCardsGallery} = useAuth()
  const {setNotification,closeNotification} = useContext(notificationContext)

  const[nameIsUnique,setNameIsUnique] = useState(true)

  const[userInfo,setUserInfo] = useState({
    id:userProfile.id,
    name:userProfile.name,
    email:userProfile.email,
    password:userProfile.password,
    confirmPassword:userProfile.password,
    location:userProfile.location
  })
  
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
          setNotification({isShown:true,message:'Successfully updated your profile information',color:'green'})
          closeNotification()
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
            userInfoInput(userInfo.password).map((input)=>(
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