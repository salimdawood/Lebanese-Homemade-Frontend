import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
//components
import FormInput from '../components/FormInput'
//api
import * as Axios  from 'axios'
//input for form
import userInfoInput from '../constantVariables/userInfoInput'


const SignUp = () => {

  const[nameIsUnique,setNameIsUnique] = useState(true)
  const navigate = useNavigate()

  const[userInfo,setUserInfo] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    location:""
  })


  const handleSubmit = (e)=>{
    console.log("clicked")
    const {name,email,password,location} = userInfo
    e.preventDefault()
    Axios.post('http://localhost:17733/api/Users',{name,email,password,location})
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
      <form onSubmit={handleSubmit} className="form">
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
  )
}

export default SignUp