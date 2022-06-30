import React from 'react'
import { IMAGE_PATH } from '../path'
import ImageSlider from './ImageSlider'

const CardPopUp = (props) => {
  const {title,type,photoList,menu,instagramLink,faceBookLink,whatsAppLink,dateCreated} = props
  return (
    <div className="card-info">
      <div className="top-container">
        <ImageSlider photoList={photoList} />
        <div className="info-gallery">
          <p>{title}</p>
          <p>{type}</p>
          <p>{dateCreated}</p>
        </div>
      </div>
      <div className="bottom-container">
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
    </div>
  )
}

export default CardPopUp