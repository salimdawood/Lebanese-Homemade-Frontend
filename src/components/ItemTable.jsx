import React from 'react'
//
import sortItemList from '../constantVariables/sortItemsList'

const ItemTable = (props) => {

  const {items,mapFunction,model} = props

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          {model && <th>actions</th>}
        </tr>
      </thead>
      <tbody>
        {
          items.length > 0 ?
          sortItemList(items).map(mapFunction)
          :
          <tr>
            <td>No items found</td>
          </tr>
        }
      </tbody>
    </table>    
  )
}

export default ItemTable