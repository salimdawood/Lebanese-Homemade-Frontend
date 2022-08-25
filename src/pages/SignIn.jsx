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
import Loading from '../components/Loading'
//input for form
import userInfoInput from '../constantVariables/userInfoInput'

const SignIn = () => {

  //notification for better ux
  const [isLoading,setIsLoading] = useState(false)
  const {setNotification,closeNotification} = useContext(notificationContext)
  const [warningMessage, setWarningMessage] = useState("")

  const [passwordReset,setPasswordReset] = useState(false)

  //user login auth
  const {dispatch} = useAuth()

  //remember me functionality
  const user = JSON.parse(localStorage.getItem("userProfile"))
  const [checked, setChecked] = useState(user !== null?true:false)
  const[userInfo,setUserInfo] = useState(
    user !== null?
    user
      :
    {
    name:"",
    password:""
    }
  )

  const navigate = useNavigate()
  

  const signIn = async(e) =>{
    const {name,password} = userInfo
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await Axios.get(URL_PATH+'Users',{
        params : {
          name: name,
          password : password
        }
      });
      //console.log(result)
      switch (result.status) {
        case 200:
          setWarningMessage("")
          dispatch({type:'ADD_USER_PROFILE',
          payload:{userProfile:{...result.data},checked:checked}
          })
          setIsLoading(false)
          navigate(`/user/${result.data.id}`,{replace:true})
          break;
        case 204:
          setWarningMessage("Username or password data are wrong *.")
          setIsLoading(false)
          break;
        default:
          setWarningMessage("Something went wrong.Try again later.")
          setIsLoading(false)
          break;
      }
    } catch (error) {
      //console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
      setIsLoading(false)
    }
  }

  const handleChange =(e)=>{
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const resetPassword = ()=>{
    const user = JSON.parse(sessionStorage.getItem("userProfile"));
    user !== null ? navigate(`/user/${user.id}`) : setPasswordReset(true)
  }

  const userInput = userInfoInput("")
  //console.log(userInput)

  return (
    <>
      {isLoading && <Loading/>}
      {passwordReset && <PasswordReset popUpState={setPasswordReset}/>}
      <form onSubmit={signIn} className="form">
      <h1>Sign in</h1>
      <div className="form-container">
        <span className="db-warning">{warningMessage}</span>
        {
          [userInput[0],userInput[2]].map((input)=>(
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
          <h3 onClick={resetPassword}>Reset password</h3>
        </div>
        <input type="submit" value="Sign in" />
        <p>Not a user?<Link to="/signup"> Create an account</Link></p>
      </div>
      </form>
    </>
    )
}

export default SignIn