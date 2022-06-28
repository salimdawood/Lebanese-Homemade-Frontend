import React from 'react'

const SelectType = ({defaultValue,typesArray,handleChange}) => {

  return (
    <select
      defaultValue={defaultValue}
      name="typeId"
      onChange={handleChange}
      required
      >
      <option value="" disabled >Choose a card type</option>
      {
        typesArray.map((type)=>(
          <option key={type.id} value={type.id}>{type.name}</option>
        ))
      }
    </select>
  )
}

export default SelectType