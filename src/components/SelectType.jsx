import React from 'react'

const SelectType = (props) => {
  const {defaultValue,typesArray,handleChange,all} = props
  

  return (
    <select
      defaultValue={defaultValue}
      name="typeId"
      onChange={handleChange}
      required
      >
      <option value="-1" disabled >Choose a card type</option>
      {all && <option value="-1">All</option>}
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