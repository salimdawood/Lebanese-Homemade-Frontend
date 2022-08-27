import React from 'react'
//
import {IMAGE_PATH} from '../constantVariables/path'
import dateBeautify from '../constantVariables/dateBeautify'
//component
import ImageSlider from './ImageSlider'


const Card = (props) => {

  const{openCardPopUp,...card} = props

  return (

    <div className="card-box">
      {
        card.photoList.length>0 ?
          <ImageSlider photoList={card.photoList}/>
        :
          <img src={IMAGE_PATH+"default.jpg"} loading="lazy" alt='default'/>
      }
      <div className="info-card">
        <h1>{card.title}</h1>
        <h3>{card.type.name}</h3>
        <div className="info-box">
          <h4>{dateBeautify(card.dateCreated)}</h4>
          <h4 onClick={()=>openCardPopUp(card)}>Show more</h4>
        </div>
      </div>
    </div>
  )
}

export default Card