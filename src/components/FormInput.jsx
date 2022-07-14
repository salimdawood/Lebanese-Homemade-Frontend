import React,{useState} from 'react'
import { VisibilityOff,VisibilityOn } from './Svg'

const FormInput = (props) => {

  const [focus,setFocus] = useState(false)
  const {label,errorMessage,onChange,id,type,...inputInfo} = props
  let pswrd = false
  const [visible,setVisible] = useState(false)
  console.log(label,type)


  if(inputInfo.name==='confirmPassword' || inputInfo.name==='password'){
    pswrd = true
  }
  const toggleVisible = () =>{
    console.log("clicked")
    if(visible){
      setVisible(false)
      return
    }
    else{
      setVisible(true)
      return
    }
  }

  return (
    <div className="form-input">
      <label>{label}</label>
      <input
       type={pswrd ? (visible ?'text' : 'password'):type}
       {...inputInfo}
       onChange={onChange}
       onBlur={()=>setFocus(true)}
       onFocus={()=>inputInfo.name==="confirmPassword" && setFocus(true)}
       focused={focus.toString()}
       />
      {pswrd &&
        (visible ?
          <VisibilityOff onClick={()=>toggleVisible()}/>
            :
          <VisibilityOn onClick={()=>toggleVisible()}/>
        )
      }
      <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput