import React,{useState} from 'react'
//api
import * as Axios from 'axios'
import { URL_PATH } from '../constantVariables/path'
//input for form
import userInfoInput from '../constantVariables/userInfoInput'
//components
import FormInput from './FormInput'

const PasswordFragment = (props) => {

  const {form} = props

  const[userInfo,setUserInfo] = useState({
    name:form.name,
    password:"",
    confirmPassword:""
  })

  const handleChange =(e)=>{
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e)=>{
    console.log("clicked")
    const {name,password} = userInfo
    e.preventDefault()
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
    Axios(config)
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case 0:
          console.log("server error .....")
          break;
        case 1:
          console.log("updated successfully")
          /*
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{...userInfo,cardList:userProfile.cardList}})
          setNameIsUnique(true)
          setNotification({isShown:true,message:'Successfully updated your profile information',color:'green'})
          closeNotification()
          */
          break;
        default:
          console.log("success code not founded")
          break;
      }
    },(error)=>{
      console.log(error)
    }); 
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