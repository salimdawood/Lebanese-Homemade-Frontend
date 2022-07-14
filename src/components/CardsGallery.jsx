import React from 'react'
import UserCard from './UserCard'
import { nanoid } from 'nanoid'
import {Close} from './Svg'
import useAuth from '../hooks/useAuth'

const CardsGallery = () => {

  const{showCardsGallery,toggleCardsGallery,userProfile:{cardList}} = useAuth()
  const arr = []

  for(let i=0;i<10;i++){
    if(cardList[i] != null){
      arr.push(cardList[i])
    }
    else{
      arr.push(null)
    }
  }

  return (
      showCardsGallery && 
      <div className="cards-gallery">
          <Close onClick={toggleCardsGallery} />
          <div className="cards-container">
            {arr.map(card=>(
              <UserCard key={nanoid()} {...card}/>
            ))}
          </div>
      </div>
  )
}

export default CardsGallery