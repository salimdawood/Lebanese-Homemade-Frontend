import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddCard = ({i,id}) => {

  const navigate = useNavigate()


  const handleClick = () =>{
    navigate(`/user/${id}/add-card`)
  }
  return (
    <div onClick={handleClick} className="card-space">
      Card {i}
    </div>
  )
}

export default AddCard