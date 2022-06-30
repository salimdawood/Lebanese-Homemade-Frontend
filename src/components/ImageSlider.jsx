import React from 'react'
import { useState } from 'react'
import { IMAGE_PATH } from '../path'

const ImageSlider = ({photoList}) => {
  const [currIndex,setCurrentIndex] = useState(0)

  const dotIndex =(index)=>{
    setCurrentIndex(index)
  }

  return (
    <div className="photo-gallery">
      <img 
        src={IMAGE_PATH+photoList.$values[currIndex].name}
        key={photoList.$values[currIndex].id}
        loading="lazy"
      />
      <div className="dots-container">
        {
        Array.from({length:photoList.$values.length}).map((item,index) =>(
          <div
            key={index}
            className={currIndex == index ? 'dot active' : 'dot'}
            onClick={()=>dotIndex(index)}
          ></div>
        ))
        }
      </div>
    </div>
  )
}

export default ImageSlider