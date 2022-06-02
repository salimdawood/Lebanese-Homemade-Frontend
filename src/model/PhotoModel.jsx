import React,{useContext,useState,useEffect} from 'react'
import reactDom from 'react-dom'
import {Close} from '../components/Svg'
import { cardContext } from '../context/cardContext'
import PhotoBox from '../components/PhotoBox'

const PhotoModel = () => {

  const {photoModel,setPhotoModel,dispatch,cardProfile} = useContext(cardContext)
  const [photoArray,setPhotoArray] = useState(cardProfile.photoList)
  const arr = []
  
  for(let i=0;i<photoArray.length && i<5;i++){
    arr.push(PhotoBox({id:i,photo:photoArray[i],setPhotoArray,photoArray}))
  }

  let condition = 5 - photoArray.length
  if(photoArray.length==0)
  {
    condition = 4
  }
  for(let i = photoArray.length;i<=condition;i++){
    arr.push(PhotoBox({id:i,photo:null,setPhotoArray,photoArray}))
  }


  return (
    photoModel && reactDom.createPortal(
      <div className="model">
        <div className="model-container">
          <Close onClick={()=>setPhotoModel(false)}/>
          {arr}
        </div>
      </div>
    ,document.getElementById('model'))
  )
}

export default PhotoModel