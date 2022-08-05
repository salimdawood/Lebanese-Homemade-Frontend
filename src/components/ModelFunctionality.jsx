import React from 'react'
//components
import {Delete,Close,Sync,Check} from './Svg'

const ModelFunctionality = (props) => {
  const {inExistingCard,updateFunc,deleteFunc,cancelFunc,confirmFunc} = props

  return (
    <ul className='model-svg'>
      {inExistingCard ? 
          <>
            <li onClick={updateFunc}>
              <Sync/>
              Update
            </li>
            <li  onClick={deleteFunc}>
              <Delete/>
              Delete
            </li>
          </>
          :
          <>
            <li onClick={confirmFunc}>
              <Check/>
              Save
            </li>
          </>
          }
          <li onClick={cancelFunc}>
            <Close/>
            Cancel
          </li>
    </ul>
  )
}

export default ModelFunctionality