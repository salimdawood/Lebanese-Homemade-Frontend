import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
//components
import FormInput from './FormInput'
import Loading from './Loading'
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


  //notification for better ui
  const {setNotification,closeNotification} = useContext(notificationContext)
  const [isLoading,setIsLoading] = useState(false)

  const {userProfile,dispatch,toggleCardsGallery} = useAuth()

  const[nameIsUnique,setNameIsUnique] = useState(true)

  const navigate =  useNavigate()

  const[userInfo,setUserInfo] = useState({
    id:userProfile.id,
    name:userProfile.name,
    email:userProfile.email,
    password:userProfile.password,
    confirmPassword:userProfile.password,
    location:userProfile.location
  })
  
  const editProfile = async(e)=>{
    const {name,email,password,location} = userInfo
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await Axios.put(URL_PATH+'Users/'+userProfile.id,{name,email,password,location});console.log(result)
      switch (result.data) {
        case -1:
          //console.log("name is not unique")
          setNameIsUnique(false)
          break;
        case 0:
          //console.log("couldn't add try agian later")
          setNameIsUnique(true)
          break;
        case 1:
          //console.log("updated successfully")
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{...userInfo,cardList:userProfile.cardList}})
          setNameIsUnique(true)
          setNotification({isShown:true,message:'Successfully updated your profile information',color:'green'})
          closeNotification()
          break;
        default:
          //console.log("success code not founded")
          break;
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const handleChange =(e)=>{
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const logOut = ()=>{
    sessionStorage.removeItem("userProfile")
    sessionStorage.removeItem("card")  
    localStorage.removeItem("userProfile")
    navigate('/signin',{replace:true})
  }

  return (
    <>
      {isLoading && <Loading/>}
      <div className="form">
        <h1>Edit your profile</h1>
        <form onSubmit={editProfile} className="form-container">
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
          <input type="submit" value="Edit Information" />
        </form>
        <input type="submit" value="Manage cards &rsaquo;&rsaquo;" onClick={toggleCardsGallery}/>
        <input type="submit" value="Log out" className="delete-btn" onClick={logOut}/>
      </div>
    </>
  )
}

export default UserDashboard