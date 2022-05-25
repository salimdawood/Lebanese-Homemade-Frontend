import React,{useContext} from 'react'
import { userContext } from '../context/userContext'
import {ExpandLess,ExpandMore} from './Svg'
import Card from './Card'

const CardsGallery = () => {

  const{showCardsGallery,userProfile:{cardList}} = useContext(userContext)
  console.log(cardList)
  let arr =[]

  for(let i=1;i<=10;i++){
    arr.push(Card(i))
  }

  return (
      showCardsGallery && 
      <div className="cards-gallery">
        <ExpandLess/>
          <div className="cards-container slide">
            {arr}
          </div>
        <ExpandMore/>
      </div>
  )
}

export default CardsGallery