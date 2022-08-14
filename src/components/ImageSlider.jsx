import React,{useState} from 'react'
//components
import { LeftCircle,RightCircle } from './Svg'
import FullImage from './FullImage'
//path for image
import { IMAGE_PATH } from '../constantVariables/path'


const ImageSlider = ({photoList}) => {
  const [currIndex,setCurrentIndex] = useState(0)
  const [fullImage,setFullImage] = useState({
    show:false,
    name:''
  })

  const dotIndex =(index)=>{
    setCurrentIndex(index)
  }
  const moveNext = ()=>{
    if(currIndex === photoList.length-1){
      setCurrentIndex(0)
    }
    else{
      setCurrentIndex(currIndex+1)
    }
  }

  const movePrev = ()=>{
    if(currIndex === 0){
      setCurrentIndex(photoList.length-1)
    }
    else{
      setCurrentIndex(currIndex-1)
    }
  }

  const showFullScreen = () =>{
    setFullImage({show:true,name:photoList[currIndex].name})
  }

  const fullImage_props = {
    ...fullImage,
    setFullImage
  }

  return (
    <>
      {fullImage.show && <FullImage {...fullImage_props}/>}
      <div className='photo-gallery'>
        {
          photoList.length>0 ?
          <>
            <img 
            src={IMAGE_PATH+photoList[currIndex].name}
            key={photoList[currIndex].id}
            loading='lazy'
            alt='product'
            onClick={showFullScreen}
            />
            <LeftCircle onClick={movePrev}/>
            <RightCircle onClick={moveNext}/>
            <div className='dots-container'>
              {
                Array.from({length:photoList.length}).map((item,index) =>(
                  <div
                    key={index}
                    className={currIndex === index ? 'dot active' : 'dot'}
                    onClick={()=>dotIndex(index)}
                  >
                  </div>
                ))
              }
            </div>
          </>
            :
          <img src={IMAGE_PATH+'default.jpg'} loading='lazy' alt='not supplied' />
        }
      </div>
    </>
      )
}

export default ImageSlider