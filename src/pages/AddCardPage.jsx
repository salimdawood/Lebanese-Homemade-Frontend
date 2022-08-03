import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
//components
import FormInput from '../components/FormInput'
import SelectType from '../components/SelectType'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//input for form
import {cardInfoInput} from '../constantVariables/cardInfoInput'
//custom hooks
import useAuth from '../hooks/useAuth'
//context
import { cardContext } from '../context/cardContext'
import {notificationContext} from '../context/notificationContext'

const AddCardPage = ({types}) => {
  
  const navigate = useNavigate()
  const {userProfile,dispatch} = useAuth()
  const {setMenuModel,setPhotoModel,cardProfile} = useContext(cardContext)
  const {setNotification,closeNotification} = useContext(notificationContext)

  const[cardInfo,setCardInfo] = useState({
    title:"",
    facebookLink:"",
    instagramLink:"",
    whatsappLink:"",
    typeId:"-1",
    userId:userProfile.id
  })
    
  const addCard = async (e)=>{
    e.preventDefault()

    let formData = new FormData()

    //card basic info
    for ( var info in cardInfo ) {
      if(cardInfo[info].length === 0){
        console.log("null appended")
        formData.append(info, "");  
      }
      else{
        formData.append(info, cardInfo[info]);
      }
    }
    //card photos
    for(let i=0;i<cardProfile.photoList.length;i++){
      if(cardProfile.photoList[i] !== null){
        formData.append('photoList', cardProfile.photoList[i])
      }
    }
    //card menu
    for(let i=0;i<cardProfile.itemList.length;i++){
      formData.append('itemList', JSON.stringify(cardProfile.itemList[i]))
    }
    //print the form
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + typeof(pair[1])); 
    }

    try {
      const result = await Axios({
        method: "post",
        url: URL_PATH+'Cards',
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }) 
      console.log(result)
      switch (result.data) {
        case -1:
          //console.log("something went wrong")
          setNotification({isShown:true,message:"Something went wrong",color:"red"})
          closeNotification()
          break;
        default:
          //console.log("card added successfully")
          setNotification({isShown:true,message:"Card added successfully",color:"green"})
          closeNotification()
          navigate(`/user/${userProfile.id}`)
          dispatch({type:'UPDATE_USER_PROFILE',userProfile:{
            ...userProfile,
            cardList:[...userProfile.cardList,{
              id:result.data,
              title:cardInfo.title,
              type:types.filter(type=>type.id == cardInfo.typeId)[0].name,
              dateCreated: new Date()
            }]}
          })
          break;
        } 
    } catch (error) {
      //console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }
  }

  const handleChange =(e)=>{
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  }

  return (
      <div className="form">
        <h1>Create your card</h1>
        <form onSubmit={addCard} className="form-container">
          {
            cardInfoInput.map((input)=>(
              <FormInput
              key={input.id}
              {...input}
              value={cardInfo[input.name]}
              onChange={handleChange} />
            ))
          }
          <label>Card type *</label>
          <SelectType defaultValue={cardInfo.typeId} handleChange={handleChange} typesArray={types}/>
          <input type="submit" value="Create" />
        </form>
        <input type="submit" onClick={()=>setMenuModel(true)} value="Manage menu" />
        <input type="submit" onClick={()=>setPhotoModel(true)} value="Manage photos" />
      </div>
  )
}

export default AddCardPage