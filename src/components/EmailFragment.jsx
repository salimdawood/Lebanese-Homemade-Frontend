import React,{useState,useEffect} from 'react'
//unique id
import { nanoid } from 'nanoid'
//components
import {Close} from './Svg'
//api
import { URL_PATH } from '../constantVariables/path'
import * as Axios from 'axios'
//email verification
import emailjs from 'emailjs-com'

const EmailFragment = ({form,setForm,setPage,setLoading}) => {


  const sendVerification = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const result = await emailjs.sendForm('service_zce6oq2','template_5a3an0o',e.target,'pREPpjkuU35zUe2vI')
      console.log(result)
      setPage(2)
    } catch (error) {
      console.log(error) 
    }
    setLoading(false)
  }


  return (
    <>
      <h1>Reset your password</h1>
      <p>We will send a verification code to your email</p>
      <form className='email-form' onSubmit={sendVerification}>
        <label>Email *</label>
        <input type="email" name="email" value={form.email}
        onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
        placeholder="Enter your email"  required/>
        <input type="hidden" name="message" value={form.message}
        onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})} />
        <input type="submit" value="Send"/>
      </form>
    </>
  )
}

export default EmailFragment