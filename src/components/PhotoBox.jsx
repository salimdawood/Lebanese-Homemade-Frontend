import React,{useState,useEffect,useContext} from 'react'
import { Close } from './Svg'
import { notificationContext } from '../context/notificationContext'
import {IMAGE_PATH} from '../path'


const PhotoBox = (props) => {

  const{id,photo,photos,setPhotos} = props
  const [fileDataURL, setFileDataURL] = useState(null)
  const [file, setFile] = useState(photo);
  let newPhotos = [...photos]
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm
  const {setNotification} = useContext(notificationContext)

  const handleFileChange = (e) =>{
    if (e.target.files[0].type.match(imageTypeRegex)) {
      //	2,097,152 b == 2mb
      if(e.target.files[0].size <= 2097152){
        newPhotos[id] = e.target.files[0]
        setPhotos([...newPhotos])
        setFile(e.target.files[0])
      }
      else{
        e.target.value = null
        setNotification({isShown:true,message:"You can't upload image bigger than 2MB",color:"red"})
      }
    }
    else{
      e.target.value = null
      setNotification({isShown:true,message:"You can't upload this image type",color:"red"})
    }
  }

  const removePhoto = () =>{
    newPhotos[id]=null 
    setPhotos([...newPhotos])
    setFile(null)
  }

  useEffect(() => {
    setFile(photo)
  }, [photo])


  useEffect(() => {
    let fileReader, isCancel = false;
    //check type of file if file continue else assign dataurl to IMAGE_PATH+photoname passed
    if( file != null && !('size' in file)){
      setFileDataURL(IMAGE_PATH+file.name)
      return
    }
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file]);



  return (
    <div className="photo-box" key={id}>
      {
        file != null && <Close onClick={removePhoto}/>
      }
      <label className="photo-label">
        {
          file != null && <img src={fileDataURL}/>
        }
        <input type="file" onChange={handleFileChange} accept="image/png,image/jpeg"/>
      </label>
    </div>
  )
}

export default PhotoBox