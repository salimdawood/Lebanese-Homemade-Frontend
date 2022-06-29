import React from 'react'

const CardPopUp = (props) => {
  const {title,type,photoList,menu,instagramLink,faceBookLink,whatsAppLink,dateCreated} = props
  return (
    <div className="card-info">
      <div>{title}</div>
      <p>{type}</p>
      <p>{dateCreated}</p>
      <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  menu.itemList.$values
                  .sort(function(a, b){
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB)
                     return -1;
                    if (nameA > nameB)
                     return 1;
                    return 0;
                   })
                  .map((item)=>(
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))
                }
              </tbody>
      </table>
    </div>
  )
}

export default CardPopUp