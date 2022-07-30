import React,{useState} from 'react'

const VerificationFragment = (props) => {

  const {form,setPage,setCodeMatch} = props

  const [code,setCode] = useState('')

  const checkVerification = (e)=>{
    e.preventDefault()
    if(code===form.message){
      setPage(3)
      setCodeMatch(true)
    }
  }

  return (
    <>
      <h1>Enter the code </h1>
      <p>Go back to resend the code if needed</p>
      <form className='email-form' onSubmit={checkVerification}>
        <label>Code *</label>
        <input type="text" name="message" value={code}
        onChange={(e)=>setCode(e.target.value)}
        placeholder="XXXXX"  required/>
        <input type="submit" value="Check"/>
      </form>
    </>
  )
}

export default VerificationFragment