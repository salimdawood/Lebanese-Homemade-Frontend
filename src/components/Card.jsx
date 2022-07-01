import React,{useState} from 'react'
import {IMAGE_PATH,URL_PATH} from '../path'
import * as Axios from 'axios'
import ImageSlider from './ImageSlider'
const Card = (props) => {
  const{openCardPopUp,...card} = props


  return (
    <div className="card-box">
      {
        card.photoList.$values.length>0 ?
          <ImageSlider photoList={card.photoList}/>
        :
          <img src={IMAGE_PATH+"default.jpg"} loading="lazy" />
      }
      <div className="info-card">
        <h1>{card.title}</h1>
        <h3>{card.type}</h3>
        <div className="info-box">
          <h4>{card.dateCreated}</h4>
          <h4 onClick={()=>openCardPopUp(card)}>Show more</h4>
        </div>
      </div>
    </div>
  )
}

export default Card