import React,{useState} from 'react'
import FormInput from '../components/FormInput'
import * as Axios  from 'axios'

const SignUp = () => {
  const[userInfo,setUserInfo] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    location:""
  })

  const userInfoInput = [
    {
      id:1,
      name:"name",
      type:"text",
      placeholder:"Enter your name",
      errorMessage:"User name should be between 3-16 characters, and should include only letters and numbers.",
      required:true,
      label:"Username *",
      pattern:"^[a-zA-Z0-9]{3,16}$"
    },
    {
      id:2,
      name:"email",
      type:"email",
      placeholder:"Enter your email",
      errorMessage:"You didn't enter a valid email.",
      required:true,
      label:"Email *"
    },
    {
      id:3,
      name:"password",
      type:"password",
      placeholder:"Enter your password",
      errorMessage:"Password should be between 8-20 characters, and must include at least: one letter,one number, and one special character.",
      required:true,
      label:"Password *",
      pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`
    },
    {
      id:4,
      name:"confirmPassword",
      type:"password",
      placeholder:"Confirm your password",
      errorMessage:"Passwords doesn't match.",
      required:true,
      label:"Confirm Password *", 
      pattern:userInfo.password
    },
    {
      id:5,
      name:"location",
      type:"text",
      placeholder:"Enter your shop location",
      errorMessage:"Shop location should be 3-20 characters",
      required:false,
      label:"Shop Location",
      pattern:"^[a-zA-Z]{3,20}$"
    }
  ]

  const handleSubmit = (e)=>{
    e.preventDefault()
    e.target.reset()
    Axios.post('http://localhost:17733/api/Users',userInfo).then((result)=>{
      console.log(result)
    },(error)=>{
      console.log(error)
    });
  }

  const handleChange =(event)=>{
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h1>Register</h1>
        <div className="form-container">
          {
            userInfoInput.map((input)=>(
              <FormInput
              key={input.id}
              {...input}
              value={userInfo[userInfoInput.name]}
              onChange={handleChange} />
            ))
          }
          <input type="submit" value="Sign up" />
        </div>
      </form>
    </>
  )
}

export default SignUp