import React from 'react'
//
import sortItemList from '../constantVariables/sortItemsList'

const SelectType = (props) => {

  const {defaultValue,typesArray,handleChange,all} = props

  return (
    <select
      defaultValue={defaultValue}
      name="typeId"
      onChange={handleChange}
      required
      >
      <option value="" disabled>Choose a card type</option>
      {all && <option value="-2">All</option>}
      {
        sortItemList(typesArray)
        .map((type)=>(
          <option key={type.id} value={type.id}>{type.name}</option>
        ))
      }
    </select>
  )
}

export default SelectType