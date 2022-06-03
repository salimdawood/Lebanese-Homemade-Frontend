import React,{useState,useEffect} from 'react'
import { Close } from './Svg';

const PhotoBox = (props) => {

  const{id,photo,photos,setPhotos} = props
  const [fileDataURL, setFileDataURL] = useState(null);
  const [file, setFile] = useState(photo);
  let newPhotos = [...photos]

  const handleFileChange = (e) =>{
    newPhotos[id] = e.target.files[0]
    setPhotos([...newPhotos])
    setFile(e.target.files[0])
  }

  const removePhoto = () =>{
    newPhotos[id]=null 
    setPhotos([...newPhotos])
    setFile(null)
  }


  useEffect(() => {
    let fileReader, isCancel = false;
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