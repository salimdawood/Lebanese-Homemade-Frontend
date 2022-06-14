import React,{useContext,useState} from 'react'
import { userContext } from '../context/userContext'
import UserCard from './UserCard'
import { nanoid } from 'nanoid'

const CardsGallery = () => {

  const{showCardsGallery,userProfile:{cardList}} = useContext(userContext)
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
          <div className="cards-container slide">
            {arr.map(card=>(
              <UserCard key={nanoid()} {...card}/>
            ))}
          </div>
      </div>
  )
}

export default CardsGallery