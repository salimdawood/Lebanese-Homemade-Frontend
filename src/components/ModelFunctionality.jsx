import React from 'react'
//components
import {Delete,Close,Sync,Check} from './Svg'

const ModelFunctionality = (props) => {
  const {inExistingCard,updateItems,deleteItems,cancelChanges,confirmItems} = props

  return (
    <ul className='model-svg'>
      {inExistingCard ? 
          <>
            <li onClick={updateItems}>
              <Sync/>
              Update
            </li>
            <li  onClick={deleteItems}>
              <Delete/>
              Delete
            </li>
          </>
          :
          <>
            <li onClick={confirmItems}>
              <Check/>
              Save
            </li>
          </>
          }
          <li onClick={cancelChanges}>
            <Close/>
            Cancel
          </li>
    </ul>
  )
}

export default ModelFunctionality