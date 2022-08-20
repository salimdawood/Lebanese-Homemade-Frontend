import React,{useState,useContext} from 'react'
import { useNavigate,Link } from 'react-router-dom'
//components
import FormInput from '../components/FormInput'
import Loading from '../components/Loading'
//api
import * as Axios  from 'axios'
//input for form
import userInfoInput from '../constantVariables/userInfoInput'
//context
import {notificationContext} from '../context/notificationContext'


const SignUp = () => {

  //notificatin for better ui
  const [isLoading,setIsLoading] = useState(false)
  const {setNotification,closeNotification} = useContext(notificationContext)

  const[nameIsUnique,setNameIsUnique] = useState(true)
  
  const navigate = useNavigate()

  const[userInfo,setUserInfo] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    location:""
  })


  const signUp = async (e)=>{
    const {name,email,password,location} = userInfo
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await Axios.post('http://localhost:17733/api/Users',{name,email,password,location});
      console.log(result)
      switch (result.data) {
        case -1:
          //console.log("name is not unique")
          setNameIsUnique(false)
          setIsLoading(false)
          break;
        case 0:
          //console.log("couldn't add try agian later")
          setNameIsUnique(true)
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          setIsLoading(false)
          break;
        case 1:
          //console.log("added successfully")
          setNotification({isShown:true,message:"Profile was created successfully",color:"green"})
          closeNotification()
          setNameIsUnique(true)
          setIsLoading(false)
          navigate("/signin")
          break;
        default:
          //console.log("success code not founded")
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
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

  return (
    <>
      {isLoading && <Loading/>}
      <form onSubmit={signUp} className="form">
        <h1>Register</h1>
        <div className="form-container">
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
          <input type="submit" value="Sign up" />
          <p>Already have account?<Link to="/signin"> Log in</Link></p>
        </div>
      </form>
    </>
  )
}

export default SignUp