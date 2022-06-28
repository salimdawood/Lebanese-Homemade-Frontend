import React,{useState} from 'react'
import {IMAGE_PATH,URL_PATH} from '../path'
import * as Axios from 'axios'
const Card = (props) => {
  const{openCardPopUp,...card} = props


  return (
    <div className="card-box">
      {
        card.photoList.$values.length>0 ?
          <img src={IMAGE_PATH+card.photoList.$values[0].name} />
        :
          <img src={IMAGE_PATH+"default.jpg"} />
      }
      <h1>{card.title}</h1>
      <h3>{card.type}</h3>
      <div className="info-box">
        <h4>{card.dateCreated}</h4>
        <h4 onClick={()=>openCardPopUp(card)}>Show more</h4>
      </div>
    </div>
  )
}

export default Card