import React from 'react'
//component
import { Check,Close } from './Svg'

const UpdateItemBox = (props) => {

  const {item,onChange,editItem} = props
  //console.log(props)
  
  return (
    <tr>
      <td><input type="text" name="name" value={item.name} onChange={onChange}
      pattern="(?=(?:.*[a-zA-Z0-9\u0621-\u064A\u0660-\u0669]){3})[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 '.]{0,47}" title="Should have at least 3 characters of alphanumeric(letters or numbers)" required/></td>
      <td><input type="text" name="price" value={item.price} onChange={onChange}
      pattern="[lL0-9\u0660-\u0669,$.]{0,20}" title="Price should be between 0-20 characters and can only contain numbers, and ($,L.L)"/></td>
      <td className="action-cell">
        <Check onClick={()=>editItem(1,item.id)}/>
        <Close onClick={()=>editItem(-1,item.id)}/>
      </td>
    </tr>
  )
}

export default UpdateItemBox