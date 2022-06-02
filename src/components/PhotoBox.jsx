import React,{useState,useEffect} from 'react'

const PhotoBox = (props) => {

  const{id,photo,photoArray,setPhotoArray} = props
  const [fileDataURL, setFileDataURL] = useState(null);
  const [file, setFile] = useState(photo);

  const handleFileChange = (e) =>{
    let photos = [...photoArray]
    photos[id] = e.target.files[0]
    setPhotoArray([...photos])
    setFile(e.target.files[0])
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
    <label className="photo-label" key={id}>
      {file != null && <img src={fileDataURL}/>}
      <input type="file" onChange={handleFileChange} accept="image/png,image/jpeg"/>
    </label>
  )
}

export default PhotoBox