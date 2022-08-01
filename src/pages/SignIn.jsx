import React,{useState,useContext} from 'react'
import {useNavigate,Link} from 'react-router-dom'
//api
import * as Axios  from 'axios'
import {URL_PATH} from '../constantVariables/path'
//custom hooks
import useAuth from '../hooks/useAuth'
//context
import {notificationContext} from '../context/notificationContext'
//components
import FormInput from '../components/FormInput'
import PasswordReset from '../components/PasswordReset'

const SignIn = () => {

  const [passwordReset,setPasswordReset] = useState(false)
  const {userProfile,dispatch} = useAuth()
  const {setNotification,closeNotification} = useContext(notificationContext)
  const [warningMessage, setWarningMessage] = useState("")
  const user = JSON.parse(localStorage.getItem("userProfile"))
  const[userInfo,setUserInfo] = useState(
    user !== null?
    user
      :
    {
    name:"",
    password:""
    }
  )
  const [checked, setChecked] = useState(user !== null?true:false);
  const navigate = useNavigate()
  /*
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  */
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
          const {id,name,email,password,cardList,location} = result.data
          dispatch({type:'ADD_USER_PROFILE',
          payload:{userProfile:{id,name,email,password,cardList,location},checked:checked}
          })
          navigate(`/user/${id}`)
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
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    });
  }
  const handleChange =(e)=>{
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }


  const userInput = [
    {
      id:1,
      name:"name",
      type:"text",
      placeholder:"Enter your name",
      errorMessage:"User name should be between 3-30 characters, and should include only letters,numbers,' and spaces.",
      required:true,
      label:"Username *",
      pattern:"^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 ']{3,30}$"
    },
    {
      id:2,
      name:"password",
      type:"password",
      placeholder:"Enter your password",
      errorMessage:"Password should be between 8-20 characters, and must include at least: one letter,one number, and one special character(!@#$%^&*).",
      label:"Password *",
      pattern:"(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}",
      required:true
    }, 
  ]

  return (
    <>
      {passwordReset && <PasswordReset popUpState={setPasswordReset}/>}
      <form onSubmit={handleSubmit} className="form">
      <h1>Sign in</h1>
      <div className="form-container">
        <span className="db-warning">{warningMessage}</span>
        {
          userInput.map((input)=>(
            <FormInput
            key={input.id}
            {...input}
            value={userInfo[input.name]}
            onChange={handleChange} />
          ))
        }
        <div className="form-checkbox">
          <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)}  />
          <label htmlFor="remember-me">Remember me</label>
          <h3 onClick={()=>setPasswordReset(true)}>Reset password</h3>
        </div>
        <input type="submit" value="Sign in" />
        <p>Not a user?<Link to="/signup"> Create an account</Link></p>
      </div>
      </form>
    </>
    )
}

export default SignIn