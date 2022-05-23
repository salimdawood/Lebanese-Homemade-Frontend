import React,{useState,useContext} from 'react'
import * as Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import {userContext} from '../context/userContext'
import {URL_PATH} from '../path'

const SignIn = () => {

  const {userProfile,dispatch} = useContext(userContext)
  const [warningMessage, setWarningMessage] = useState("")
  const[userInfo,setUserInfo] = useState({
    name:"",
    password:""
  })
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    const {name,password} = userInfo
    e.preventDefault()
    Axios.get(URL_PATH+'Users',{
      params : {
        name: name,
        password : password
      }
    })
    .then((result)=>{
      console.log(result)
      switch (result.status) {
        case 200:
          setWarningMessage("")
          dispatch({type:'USER_PROFILE',userProfile:result.data})
          navigate(`/user/${result.data.name}`)
          break;
        case 204:
          setWarningMessage("Username or password data are wrong *.")
          break;
        default:
          setWarningMessage("Something went wrong.Try again later.")
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
      <h1>Log in</h1>
      <div className="form-container">
        <span className="db-warning">{warningMessage}</span>
        <div className="form-input">
          <label>User name *</label>
          <input type="text" placeholder="Enter your name" name = "name"  value={userInfo.name} onChange={handleChange} required/>
        </div>
        <div className="form-input">
          <label>Password *</label>
          <input type="password" placeholder="Enter your password" name = "password" value={userInfo.password} onChange={handleChange} required/>
        </div>
        <div className="form-checkbox">
          <input type="checkbox" value="remember-me" />
          <label>Remember me</label>
        </div>
        <input type="submit" value="Sign up" />
      </div>
    </form>
  )
}

export default SignIn