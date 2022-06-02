import React from 'react'

const ReadOnlyItemBox = ({item}) => {
  return (
    <tr key={item.name}>
      <td>{item.name}</td>
      <td>{item.price}</td>
    </tr>
  )
}

export default ReadOnlyItemBox