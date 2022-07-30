import React,{useState,useEffect} from 'react'
//unique id
import { nanoid } from 'nanoid'
//components
import {Close} from './Svg'
import EmailFragment from './EmailFragment'
import VerificationFragment from './VerificationFragment'
import Loading from './Loading'

const PasswordReset = ({popUpState}) => {

  const [loading,setLoading] = useState(false)
  const [codeSent,setCodeSent] = useState(false) 

  const [form,setForm] = useState({
    email:"",
    message:nanoid(5)
  })

  const[page,setPage] = useState(1)
  const prevFragment = ()=>{
    if(page===2) setPage(1)
  }
  const nextFragment = ()=>{
    if(page===1) setPage(2)
  }

  return (
    <div className='password-popup'>
      {loading && <Loading/>}
      <div className="container">
        <Close onClick={()=>popUpState(false)}/>
        {
          page===1?
          <EmailFragment form={form} setForm={setForm} setPage={setPage} setLoading={setLoading}
          setCodeSent={setCodeSent}
          />
            :
          <VerificationFragment form={form}/>
        }
        <button className='prev-btn' disabled={page===1?true:false} onClick={prevFragment}>Previous</button>
        <button className='next-btn' disabled={page===1 && codeSent?false:true} onClick={nextFragment}>Next</button>
      </div>
    </div>
  )
}

export default PasswordReset