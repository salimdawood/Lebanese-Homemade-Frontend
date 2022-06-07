import React from 'react'
import { Delete,Edit } from './Svg'

const ReadOnlyItemBox = ({item,removeItem,editItem}) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td className="action-cell">
        <Edit onClick={()=>editItem(0,item.id)}/>
        <Delete onClick={()=>removeItem(item.id)}/>
      </td>
    </tr>
  )
}

export default ReadOnlyItemBox