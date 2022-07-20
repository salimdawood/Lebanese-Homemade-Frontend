import { toBeValid } from '@testing-library/jest-dom/dist/matchers'
import React,{useState} from 'react'
import { VisibilityOff,VisibilityOn } from './Svg'

const FormInput = (props) => {

  const [focus,setFocus] = useState(false)
  const {label,errorMessage,onChange,id,type,value,...inputInfo} = props
  const [visible,setVisible] = useState(false)
  let pswrd = false
  let link = false
  let base_url = ''

  if(inputInfo.name==='confirmPassword' || inputInfo.name==='password'){
    pswrd = true
  }
  const toggleVisible = () =>{
    if(visible){
      setVisible(false)
      return
    }
    else{
      setVisible(true)
      return
    }
  }
  //use regex
  if(inputInfo.name==='facebookLink' || inputInfo.name==='instagramLink' || inputInfo.name==='whatsappLink'){
    link = true
    switch (inputInfo.name) {
      case 'facebookLink':
        base_url='https://facebook.com/'
        break;
      case 'whatsappLink':
        base_url='https://wa.me//961'
        break;
      case 'instagramLink':
        base_url='https://instagram.com/'
        break;
      default:
        break;
    }
  }

  return (
    <div className="form-input">
      <label>{label}</label>
      <input
       type={pswrd ? (visible ?'text' : 'password'):type}
       value={value}
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
      {
        link &&
        (value.length>0?
          <a href={`${base_url}${value}`} target="_blank">Test the link</a>
          :
          <></>
        )
      }
    </div>
  )
}

export default FormInput