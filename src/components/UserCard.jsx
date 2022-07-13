import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'
import { cardContext } from '../context/cardContext'
import * as Axios from 'axios'
import {URL_PATH} from '../path'

const UserCard = (props) => {

  const {userProfile:{id}} = useContext(userContext)
  const {cardProfile,dispatch} = useContext(cardContext)
  const navigate = useNavigate()

  let dateDB = new Date(props.dateCreated)
  let dateNow = new Date()
  var diff = (dateNow - dateDB);
  console.log(dateDB,dateNow,diff)
  //86400000 === 24 hours
  
  const updateCard = () =>{
    Axios.get(URL_PATH+`Cards/${props.id}`)
    .then((result)=>{
      console.log(result)
      
      //dispatch({type:'UPDATE_CARD_PROFILE',cardProfile:{...result.data}})
      sessionStorage.setItem("card",JSON.stringify(result.data))
      navigate(`/user/${id}/cards?card=${props.id}`)
    },(error)=>{
      console.log(error)
    });
  }

  const addCard = () =>{
    navigate(`/user/${id}/add-card`)
  }
  
  return (
    props.id != null ?
    <div onClick={updateCard} className="card-space">
      <h3>{props.title}</h3>
      <h4>{props.type}</h4>
      <h6>{diff>=86400000?dateDB.toLocaleString('ar-EG'):dateDB.toLocaleTimeString('ar-EG')}</h6>
    </div>
    :
    <div onClick={addCard} className="card-space card-add">
    </div>

  )
}

export default UserCard