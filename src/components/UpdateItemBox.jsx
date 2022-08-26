import React from 'react'
//component
import { Check,Close } from './Svg'

const UpdateItemBox = (props) => {

  const {item,onChange,editItem} = props
  
  return (
    <tr>
      <td><input type="text" name="name" value={item.name} onChange={onChange}/></td>
      <td><input type="text" name="price" value={item.price} onChange={onChange}/></td>
      <td className="action-cell">
        <Check onClick={()=>editItem(1,item.id)}/>
        <Close onClick={()=>editItem(-1,item.id)}/>
      </td>
    </tr>
  )
}

export default UpdateItemBox