import React from 'react'
//components
import UserCard from './UserCard'
import {Close} from './Svg'
//context
import useAuth from '../hooks/useAuth'

const CardsGallery = () => {

  const{showCardsGallery,toggleCardsGallery,userProfile:{cardList}} = useAuth()
  const cards_array = []

  for(let i=0;i<10;i++){
    if(cardList[i] != null){
      cards_array.push(cardList[i])
    }
    else{
      cards_array.push(null)
    }
  }

  return (
      showCardsGallery && 
      <div className="cards-gallery">
          <Close onClick={toggleCardsGallery} />
          <div className="cards-container">
            {cards_array.slice(0,10).map((card,index)=>(
              <UserCard key={index} {...card}/>
            ))}
          </div>
      </div>
  )
}

export default CardsGallery