import React,{useContext,useState} from 'react'
import { userContext } from '../context/userContext'
import UserCard from './UserCard'

const CardsGallery = () => {

  const{showCardsGallery,userProfile:{cardList}} = useContext(userContext)
  const arr = []

  for(let i=0;i<cardList.length && i<10;i++){
    arr.push(UserCard(cardList[i]))
  }
  for(let i=0;i<10-cardList.length;i++){
    arr.push(UserCard())
  }

  return (
      showCardsGallery && 
      <div className="cards-gallery">
          <div className="cards-container slide">
            {arr.slice(0,10)}
          </div>
      </div>
  )
}

export default CardsGallery