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
        typesArray
        .sort(function(a, b){
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
          if (nameA < nameB)
           return -1;
          if (nameA > nameB)
           return 1;
          return 0;
         })
        .map((type)=>(
          <option key={type.id} value={type.id}>{type.name}</option>
        ))
      }
    </select>
  )
}

export default SelectType