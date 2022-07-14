import React,{useState} from 'react'
import { LeftCircle,RightCircle } from './Svg'
import { IMAGE_PATH } from '../constantVariables/path'


const ImageSlider = ({photoList}) => {
  const [currIndex,setCurrentIndex] = useState(0)

  const dotIndex =(index)=>{
    setCurrentIndex(index)
  }
  const moveNext = ()=>{
    if(currIndex == photoList.$values.length-1){
      setCurrentIndex(0)
    }
    else{
      setCurrentIndex(currIndex+1)
    }
  }

  const movePrev = ()=>{
    if(currIndex == 0){
      setCurrentIndex(photoList.$values.length-1)
    }
    else{
      setCurrentIndex(currIndex-1)
    }
  }

  return (
    <div className="photo-gallery">
      <img 
        src={IMAGE_PATH+photoList.$values[currIndex].name}
        key={photoList.$values[currIndex].id}
        loading="lazy"
      />
      <LeftCircle onClick={movePrev}/>
      <RightCircle onClick={moveNext}/>
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