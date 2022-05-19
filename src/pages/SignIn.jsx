import React,{useState} from 'react'

const SignIn = () => {

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
      label:"Username"
    },
    {
      id:2,
      name:"email",
      type:"email",
      placeholder:"Enter your email",
      label:"Email"
    },
    {
      id:3,
      name:"password",
      type:"password",
      placeholder:"Enter your password",
      label:"Password"
    },
    {
      id:4,
      name:"confirmPassword",
      type:"password",
      placeholder:"Confirm your password",
      label:"Confirm Password"
    },
    {
      id:5,
      name:"location",
      type:"text",
      placeholder:"Enter your shop location",
      label:"Shop Location"
    }
  ]

  return (
    <>
    </>
  )
}

export default SignIn