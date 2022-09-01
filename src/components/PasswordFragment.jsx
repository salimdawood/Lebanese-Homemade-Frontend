import React,{useState,useContext} from 'react'
//api
import * as Axios from 'axios'
import { URL_PATH } from '../constantVariables/path'
//input for form
import userInfoInput from '../constantVariables/userInfoInput'
//components
import FormInput from './FormInput'
//context
import { notificationContext } from '../context/notificationContext'

const PasswordFragment = (props) => {

  const {form,setIsLoading,popUpState} = props
  
  const {setNotification,closeNotification} = useContext(notificationContext)

  const[userInfo,setUserInfo] = useState({
    name:form.name,
    password:"",
    confirmPassword:""
  })

  const handleChange =(e)=>{
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e)=>{
    //console.log("clicked")
    const {name,password} = userInfo
    e.preventDefault()
    setIsLoading(true)
    try {
      var data = JSON.stringify([
        {
          "op": "replace",
          "path": "/password",
          "value": password
        }
      ]);
      
      var config = {
        method: 'patch',
        url: URL_PATH+`Users/${name}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      const result = await Axios(config)
      //console.log(result)
      switch (result.data) {
        case -2:
          //console.log("data failed server validation")
          setIsLoading(false)
          setNotification({isShown:true,message:"Please respect data validation",color:"red"})
          closeNotification()
          break;
        case 0:
          //console.log("server error")
          setIsLoading(false)
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
        case 1:
          //console.log("changed successfully")
          setIsLoading(false)
          setNotification({isShown:true,message:'Successfully changed your password',color:'green'})
          closeNotification()
          popUpState(false)
          break;
        default:
          //console.log("success code not founded")
          setIsLoading(false)
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
      }
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <h1>Change your password</h1>
      <div className="form-container">
        {
          userInfoInput(userInfo.password).slice(2,4).map((input)=>(
            <FormInput
            key={input.id}
            {...input}
            value={userInfo[input.name]}
            onChange={handleChange} />
          ))
        }
        <input type="submit" value="Change password" />
      </div>
    </form>
)
}

export default PasswordFragment