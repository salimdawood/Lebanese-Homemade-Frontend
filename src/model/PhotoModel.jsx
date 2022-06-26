import React,{useContext,useState,useEffect} from 'react'
import reactDom from 'react-dom'
import {Close} from '../components/Svg'
import { cardContext } from '../context/cardContext'
import PhotoBox from '../components/PhotoBox'
import { useLocation } from 'react-router-dom'
import * as Axios from 'axios'
import { URL_PATH } from '../path'
import { notificationContext } from '../context/notificationContext'

const PhotoModel = () => {

  const {photoModel,setPhotoModel,dispatch,cardProfile} = useContext(cardContext)
  const {setNotification} = useContext(notificationContext)
  //get photolist from card session
  //like menu model assign photos according to add or update card state
  //pass it to photobox
  const [photos,setPhotos] = useState([])
  const arr = []

  //detect whether we are in a update or create state 
  const location = useLocation()
  let inExistingCard = location.pathname.includes('/cards')? true :false 

  //change the displaying items depending on our current card state
  useEffect(() => {
    if(inExistingCard){
      let tmpItems = JSON.parse(sessionStorage.getItem("card"))
      if(tmpItems.photoList !== null){
        setPhotos(tmpItems.photoList.$values)
        return
      }
    }
    setPhotos(cardProfile.photoList)
  },[location])



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
  const updatePhotos = () =>{
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

    Axios({
      method: "put",
      url: URL_PATH+`Photos/${card.id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case -1:
          console.log("something went wrong")
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          break;
        default:
          console.log("card added successfully")
          setNotification({isShown:true,message:"Card added successfully",color:"green"})
          break;
        }
    },(error)=>{
      console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
    });

    //update card session
  }
  const deletePhotos = () =>{
    //delete all photos using api call
    let card = JSON.parse(sessionStorage.getItem("card"))
    Axios.delete(URL_PATH+`Photos/${card.id}`)
    .then((result)=>{
      console.log(result)
      switch (result.data) {
        case 1:
          setNotification({isShown:true,message:"Photos were deleted successfully",color:'green'})
          break;
      
        default:
          setNotification({isShown:true,message:"Something went wrong",color:'red'})
          break;
      }
    },(error)=>{
      console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:'red'})
    });
    //update card session
    card.photoList.$values = []
    sessionStorage.setItem("card",JSON.stringify(card))
  }

  return (
    photoModel && reactDom.createPortal(
      <div className="model">
        <div className="model-container">
          <Close onClick={()=>setPhotoModel(false)}/>
          {arr}
          {inExistingCard ? 
          <>
            <input type="submit" onClick={updatePhotos} className="confirm-btn" value="Update"/>
            <input type="submit" onClick={deletePhotos} className="delete-btn" value="Delete all photos"/>
          </>
          :
          <>
            <input type="submit" onClick={confirmPhotos} className="confirm-btn" value="Confirm"/>
          </>
          }
        </div>
      </div>
    ,document.getElementById('model'))
  )
}

export default PhotoModel