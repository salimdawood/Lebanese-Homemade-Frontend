import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
//context
import { userContext } from '../context/userContext'
//api
import * as Axios from 'axios'
import {URL_PATH} from '../constantVariables/path'
//component
import Loading from './Loading'
//
import dateBeautify from '../constantVariables/dateBeautify'

const UserCard = (props) => {

  const {dateCreated,id:cardId,title,type} = props

  const[isLoading,setIsLoading] = useState(false)
  const {userProfile:{id}} = useContext(userContext)
  const navigate = useNavigate()
  
  const updateCard = async () =>{
    setIsLoading(true)
    try {
      const result = await Axios.get(URL_PATH+`Cards/${cardId}`)
      //console.log(result)
      sessionStorage.setItem("card",JSON.stringify(result.data))
      setIsLoading(false)
      navigate(`/user/${id}/cards?card=${cardId}`)
    } catch (error) {
      //console.log(error)
      setIsLoading(false)
    }
  }

  const addCard = () =>{
    navigate(`/user/${id}/add-card`)
  }
  
  return (
    <>
      {isLoading && <Loading/>}
      {
        cardId ?
        <div onClick={updateCard} className="card-space">
          <h3>{title}</h3>
          <h4>{type}</h4>
          <h6>{dateBeautify(dateCreated)}</h6>
        </div>
        :
        <div onClick={addCard} className="card-space card-add">
        </div>
      }
    </>
  )
}

export default UserCard