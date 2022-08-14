import React from 'react'
//components
import { Close } from './Svg'
//path for image
import { IMAGE_PATH } from '../constantVariables/path'

const FullImage = (props) => {

  const {name,setFullImage} = props

  const closeFullScreen = () =>{
    setFullImage({show:false,name:''})
  }

  return (
    <div className='full-screen-container'>
      <Close onClick={closeFullScreen}/>
      <img src={IMAGE_PATH+name} alt='product'/>
    </div>
  )
}

export default FullImage