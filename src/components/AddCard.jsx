import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'
import { cardContext } from '../context/cardContext'
import * as Axios from 'axios'
import {URL_PATH} from '../path'

const AddCard = (props) => {

  const {userProfile:{id}} = useContext(userContext)
  const {cardProfile,dispatch} = useContext(cardContext)
  const navigate = useNavigate()

  const handleClick = () =>{
    Axios.get(URL_PATH+`Cards/${props.id}`)
    .then((result)=>{
      console.log(result)
      dispatch({type:'UPDATE_CARD_PROFILE',cardProfile:{...result.data}})
      /*
      switch (result.data) {
        case -1:
          console.log("name is not unique")
          setNameIsUnique(false)
          break;
        case 0:
          console.log("couldn't add try agian later")
          setNameIsUnique(true)
          break;
        case 1:
          console.log("added successfully")
          setNameIsUnique(true)
          navigate("/signin")
          break;
        default:
          console.log("success code not founded")
          break;
      }
      */
      navigate(`/user/${id}/add-card`)
    },(error)=>{
      console.log(error)
    }); 
    //navigate(`/user/${id}/add-card`)
  }
  
  return (
    props != null ?
    <div key={props.id} onClick={handleClick} className="card-space">
      <h3>{props.title}</h3>
      <h4>{props.type}</h4>
      <h6>{props.dateCreated}</h6>
    </div>
    :
    <div className="card-space">
    </div>

  )
}

export default AddCard