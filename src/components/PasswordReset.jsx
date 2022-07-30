import React,{useState} from 'react'
//unique id
import { nanoid } from 'nanoid'
//components
import {Close} from './Svg'
import EmailFragment from './EmailFragment'
import VerificationFragment from './VerificationFragment'
import PasswordFragment from './PasswordFragment'
import Loading from './Loading'

const PasswordReset = ({popUpState}) => {

  const [loading,setLoading] = useState(false)
  const [codeSent,setCodeSent] = useState(false)
  const [codeMatch,setCodeMatch] = useState(false)  
  const[page,setPage] = useState(3)

  const [form,setForm] = useState({
    name:"",
    message:nanoid(5)
  })

  
  const prevFragment = ()=>{
    if(page!==1) setPage(page-1)
  }
  const nextFragment = ()=>{
    if(page!==3) setPage(page+1)
  }

  let email_props = {
    form,
    setForm,
    setPage,
    setLoading,
    setCodeSent
  }
  let verification_props = {
    form,
    setCodeMatch,
    setPage
  }
  let password_props = {
    form
  }

  const inflateFragment = (pageNumber) =>{
    switch (pageNumber) {
      case 1:
        return <EmailFragment {...email_props}/>
      case 2:
        return <VerificationFragment {...verification_props}/>
      case 3:
        return <PasswordFragment {...password_props}/>
      default:
        return
    }
  }

  return (
    <div className='password-popup'>
      {loading && <Loading/>}
      <div className="container">
        <Close onClick={()=>popUpState(false)}/>
         {inflateFragment(page)}
        <button className='prev-btn' disabled={page===1?true:false} onClick={prevFragment}>Previous</button>
        <button className='next-btn' disabled={(page===1 && codeSent)||(page===2 && codeMatch)?false:true} onClick={nextFragment}>Next</button>
      </div>
    </div>
  )
}

export default PasswordReset