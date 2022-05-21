import React,{useState} from 'react'

const FormInput = (props) => {

  const [focus,setFocus] = useState(false)
  const {label,errorMessage,onChange,id,...inputInfo} = props

  const handleFocus = ()=>{
    setFocus(true)
  }

  return (
    <div className="form-input">
      <label>{label}</label>
      <input
       {...inputInfo}
       onChange={onChange}
       onBlur={handleFocus}
       onFocus={()=>inputInfo.name==="confirmPassword" && setFocus(true)}
       focused={focus.toString()}
       />
      <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput