import React from 'react'
//component
import { Check,Close } from './Svg'
import FormInput from './FormInput'
//input for form
import { itemInfoInput } from '../constantVariables/itemInfoInput'

const UpdateItemBox = ({item,onChange,editItem}) => {
  return (
    <tr>
      {
        itemInfoInput.map((input)=>(
          <td key={input.id}>
            <input
            {...input}
            value={item[input.name]}
            onChange={onChange} />
          </td>
        ))
      }
      <td className="action-cell">
        <Check onClick={()=>editItem(1,item.id)}/>
        <Close onClick={()=>editItem(-1,item.id)}/>
      </td>
    </tr>
  )
}

export default UpdateItemBox