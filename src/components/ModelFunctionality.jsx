import React from 'react'
//components
import {Delete,Close,Sync,Check} from './Svg'

const ModelFunctionality = (props) => {
  
  const {inExistingCard,updateFunc,deleteFunc,cancelFunc,confirmFunc} = props

  return (
    <ul className='model-svg'>
      {inExistingCard ? 
          <>
            <li onClick={updateFunc} data-tooltip='Sync changes' className='succ-btn'>
              <Sync/>
              Update
            </li>
            <li  onClick={deleteFunc} data-tooltip='Delete all ' className='warn-btn'>
              <Delete/>
              Delete
            </li>
          </>
          :
          <>
            <li onClick={confirmFunc} data-tooltip='Save to card' className='succ-btn'>
              <Check/>
              Save
            </li>
          </>
          }
          <li onClick={cancelFunc} data-tooltip='Cancel all changes' className='cancel-btn'>
            <Close/>
            Cancel
          </li>
    </ul>
  )
}

export default ModelFunctionality