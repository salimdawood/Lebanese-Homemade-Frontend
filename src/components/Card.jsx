import React from 'react'
import {IMAGE_PATH} from '../constantVariables/path'
import ImageSlider from './ImageSlider'


const Card = (props) => {
  const{openCardPopUp,...card} = props

  let dateDB = new Date(card.dateCreated)
  let dateNow = new Date()
  var diff = (dateNow - dateDB)
  //86400000 === 24 hours

  return (

    <div className="card-box">
      {
        card.photoList.length>0 ?
          <ImageSlider photoList={card.photoList}/>
        :
          <img src={IMAGE_PATH+"default.jpg"} loading="lazy" />
      }
      <div className="info-card">
        <h1>{card.title}</h1>
        <h3>{card.type.name}</h3>
        <div className="info-box">
          <h4>{diff>=86400000?dateDB.toLocaleString('ar-EG'):dateDB.toLocaleTimeString('ar-EG')}</h4>
          <h4 onClick={()=>openCardPopUp(card)}>Show more</h4>
        </div>
      </div>
    </div>
  )
}

export default Card