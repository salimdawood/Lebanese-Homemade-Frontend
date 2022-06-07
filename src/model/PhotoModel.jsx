import React,{useContext,useState,useEffect} from 'react'
import reactDom from 'react-dom'
import {Close} from '../components/Svg'
import { cardContext } from '../context/cardContext'
import PhotoBox from '../components/PhotoBox'
import { nanoid } from 'nanoid'

const PhotoModel = () => {

  const {photoModel,setPhotoModel,dispatch,cardProfile} = useContext(cardContext)
  const [photos,setPhotos] = useState(cardProfile.photoList)
  const arr = []


  for(let i =0;i<5;i++){
    if(photos[i] != null){
      arr.push(PhotoBox({id:i,photo:photos[i],setPhotos,photos}))
    }
    else{
      arr.push(PhotoBox({id:i,photo:null,setPhotos,photos}))
    }
  }

  const confirmPhotos = () =>{
    //add photos to card information context
    dispatch({type:'ADD_PHOTOS',photos})
  }


  return (
    photoModel && reactDom.createPortal(
      <div className="model">
        <div className="model-container">
          <Close onClick={()=>setPhotoModel(false)}/>
          {arr}
          <input type="submit" onClick={confirmPhotos} value="Confirm"/>
        </div>
      </div>
    ,document.getElementById('model'))
  )
}

export default PhotoModel