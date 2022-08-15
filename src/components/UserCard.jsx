import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
//context
import { userContext } from '../context/userContext'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//component
import Loading from './Loading'

const UserCard = (props) => {

  const[isLoading,setIsLoading] = useState(false)
  const {userProfile:{id}} = useContext(userContext)
  const navigate = useNavigate()

  let dateDB = new Date(props.dateCreated)
  let dateNow = new Date()
  var diff = (dateNow - dateDB)
  //86400000 === 24 hours
  
  const updateCard = async () =>{
    setIsLoading(true)
    try {
      const result = await Axios.get(URL_PATH+`Cards/${props.id}`)
      //console.log(result)
      sessionStorage.setItem("card",JSON.stringify(result.data))
      setIsLoading(false)
      navigate(`/user/${id}/cards?card=${props.id}`)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const addCard = () =>{
    navigate(`/user/${id}/add-card`)
  }
  
  return (
    <>
      {isLoading && <Loading/>}
      {
        props.id != null ?
        <div onClick={updateCard} className="card-space">
          <h3>{props.title}</h3>
          <h4>{props.type}</h4>
          <h6>{diff>=86400000?dateDB.toLocaleString('ar-EG'):dateDB.toLocaleTimeString('ar-EG')}</h6>
        </div>
        :
        <div onClick={addCard} className="card-space card-add">
        </div>
      }
    </>
  )
}

export default UserCard