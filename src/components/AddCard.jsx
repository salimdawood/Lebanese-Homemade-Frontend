import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'

const AddCard = ({i}) => {

  const {userProfile:{id}} = useContext(userContext)
  const navigate = useNavigate()


  const handleClick = () =>{
    navigate(`/user/${id}/add-card`)
  }
  return (
    <div key={i} onClick={handleClick} className="card-space">
      Card {i}
    </div>
  )
}

export default AddCard