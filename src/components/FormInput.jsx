import React,{useState} from 'react'

const FormInput = (props) => {

  const [focus,setFocus] = useState(false)
  const {label,errorMessage,onChange,id,...inputInfo} = props


  return (
    <div className="form-input">
      <label>{label}</label>
      <input
       {...inputInfo}
       onChange={onChange}
       onBlur={()=>setFocus(true)}
       onFocus={()=>inputInfo.name==="confirmPassword" && setFocus(true)}
       focused={focus.toString()}
       />
      <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput