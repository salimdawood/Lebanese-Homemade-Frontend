import React,{useState} from 'react'

const VerificationFragment = (props) => {

  const {form,setPage,setCodeMatch} = props

  const [code,setCode] = useState('')
  const [errorMessage,setErrorMessage] = useState('')

  const checkVerification = (e)=>{
    e.preventDefault()
    if(code===form.message){
      setCodeMatch(true)
      setPage(3)
    }
    else{
      setErrorMessage('Code entered doesn\'t match')
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
        <span>{errorMessage}</span>
        <input type="submit" value="Check"/>
      </form>
    </>
  )
}

export default VerificationFragment