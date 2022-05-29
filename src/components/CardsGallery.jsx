import React,{useContext} from 'react'
import { userContext } from '../context/userContext'
import AddCard from './AddCard'

const CardsGallery = () => {

  const{showCardsGallery,userProfile:{cardList}} = useContext(userContext)
  console.log(cardList)
  let arr =[]

  for(let i=0;i<cardList.length;i++){
    arr.push(AddCard({i}))
  }
  for(let i=0;i<10-cardList.length;i++){
    arr.push(AddCard({i}))
  }

  return (
      showCardsGallery && 
      <div className="cards-gallery">
          <div className="cards-container slide">
            {arr}
          </div>
      </div>
  )
}

export default CardsGallery