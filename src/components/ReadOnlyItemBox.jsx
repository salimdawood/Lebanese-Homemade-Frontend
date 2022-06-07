import React from 'react'
import { Close,Edit } from './Svg'

const ReadOnlyItemBox = ({item}) => {
  return (
    <tr key={item.name}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td className="action-cell">
        <Edit/>
        <Close/>
      </td>
    </tr>
  )
}

export default ReadOnlyItemBox