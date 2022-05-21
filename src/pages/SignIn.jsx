import React,{useState} from 'react'
import * as Axios  from 'axios'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {

  const [isUser, setIsUser] = useState(false)
  const[userInfo,setUserInfo] = useState({
    name:"",
    password:""
  })
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    const {name,password} = userInfo
    e.preventDefault()
    Axios.get('http://localhost:17733/api/Users',{
      params : {
        name: name,
        password : password
      }
    })
    .then((result)=>{
      console.log(result)
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
        {isUser && <span className="db-warning">Usernaem or password data are wrong *</span>}
        <div className="form-input">
          <label>User name *</label>
          <input type="text" placeholder="Enter your name" name = "name"  value={userInfo.name} onChange={handleChange} required/>
        </div>
        <div className="form-input">
          <label>Password *</label>
          <input type="password" placeholder="Enter your password" name = "password" value={userInfo.password} onChange={handleChange} required/>
        </div>
        <input type="submit" value="Sign up" />
      </div>
    </form>
  )
}

export default SignIn