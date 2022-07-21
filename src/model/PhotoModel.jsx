import React,{useContext,useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import reactDom from 'react-dom'
//components
import PhotoBox from '../components/PhotoBox'
//context
import { cardContext } from '../context/cardContext'
import { notificationContext } from '../context/notificationContext'
//api
import { URL_PATH } from '../constantVariables/path'
import * as Axios from 'axios'

const PhotoModel = () => {

  const {photoModel,setPhotoModel,dispatch,cardProfile} = useContext(cardContext)
  const {setNotification,closeNotification} = useContext(notificationContext)
  //assign photos according to add or update card state
  //pass it to photobox
  const [photos,setPhotos] = useState([])

  //detect whether we are in a update or create state 
  const location = useLocation()
  let inExistingCard = location.pathname.includes('/add-card')? false :true 
  //change the displaying items depending on our current card state
  //find better way than location too much render
  useEffect(() => {
    if(photoModel){
      console.log("photo model rendered.....")
      if(inExistingCard){
        let tmpItems = JSON.parse(sessionStorage.getItem("card"))
        try{
          if(tmpItems.photoList !== null){
            setPhotos(tmpItems.photoList.$values)
            return
          }
        }catch(Exception){}
      }
      setPhotos(new Array(5).fill(null))  
    }
    },[photoModel])


  const arr = []
  for(let i =0;i<5;i++){
    //five photo placeholders
    //if file is entered pass it to the placeholder
    //else pass null
    if(photos[i] != null){
      arr.push(PhotoBox({id:i,photo:photos[i],setPhotos,photos}))
    }
    else{
      arr.push(PhotoBox({id:i,photo:null,setPhotos,photos}))
    }
  }

  //transfer data from local state to global 
  const confirmPhotos = () =>{
    //add photos to card information context
    dispatch({type:'ADD_PHOTOS',photos})
    setPhotoModel(false)
  }

  //cancel all changes 
  const cancelChanges = () =>{
    if(inExistingCard){
      let tmpItems = JSON.parse(sessionStorage.getItem("card"))
      if(tmpItems.photoList !== null){
        setPhotos(tmpItems.photoList.$values)
      }
    }
    else{
      setPhotos(cardProfile.photoList)
    }
    setPhotoModel(false)

  }

  //api calls
  const updatePhotos = async() =>{
    let card = JSON.parse(sessionStorage.getItem("card"))
    //update photos using api call
    let formData = new FormData()
    console.log(photos)
    for(let i=0;i<photos.length;i++){
      if(photos[i] !== null){
        if(!('size' in photos[i])){
          formData.append('stringPhotoList', photos[i].name)  
        }
        else{
          formData.append('filePhotoList', photos[i])
        }
      }
    }
     //print the form
     for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    try {
      const result = await Axios({
        method: "put",
        url: URL_PATH+`Photos/${card.id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
        default:
          console.log("photos updated successfully")
           //update card session
          card.photoList.$values = [...result.data.$values]
          sessionStorage.setItem("card",JSON.stringify(card))
          setNotification({isShown:true,message:"Card added successfully",color:"green"})
          closeNotification()
          break;
        }
    } catch (error) {
      console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }
    setPhotoModel(false)
  }

  const deletePhotos = async () =>{
    //delete all photos using api call
    let card = JSON.parse(sessionStorage.getItem("card"))
    try {
      const result = await Axios.delete(URL_PATH+`Photos/${card.id}`)
      switch (result.data) {
        case 1:
          setNotification({isShown:true,message:"Photos were deleted successfully",color:'green'})
          closeNotification()
          //update card session
          card.photoList.$values = []
          sessionStorage.setItem("card",JSON.stringify(card))
          break;
        default:
          setNotification({isShown:true,message:"Something went wrong",color:'red'})
          closeNotification()
          break;
      }
    } catch (error) {
      console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:'red'})
      closeNotification()
    }
    setPhotoModel(false)
  }

  return (
    photoModel && reactDom.createPortal(
      <div className="model">
        <div className="model-container">
          {arr}
          {inExistingCard ? 
          <>
            <input type="submit" onClick={updatePhotos} className="confirm-btn" value="Update photos"/>
            <input type="submit" onClick={deletePhotos} className="delete-btn" value="Delete all photos"/>
          </>
          :
          <>
            <input type="submit" onClick={confirmPhotos} className="confirm-btn" value="Save"/>
          </>
          }
          <input type="submit" onClick={cancelChanges} className="safety-btn" value="Cancel"/>
        </div>
      </div>
    ,document.getElementById('model'))
  )
}

export default PhotoModel