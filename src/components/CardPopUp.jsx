import React from 'react'
import ImageSlider from './ImageSlider'
import { Facebook,Instagram,WhatsApp } from './Svg'
import { useNavigate,useLocation } from 'react-router-dom'

const CardPopUp = (props) => {
  const {title,type,photoList,menu,instagramLink,faceBookLink,whatsAppLink,dateCreated,user} = props

  const navigate = useNavigate()
  const location = useLocation()

  //get userId of the card and allow visitor to see all cards of this user in a different page
  const getCardsOfUser = ()=>{
      navigate(`${user.name}/cards`)
  }

  let dateDB = new Date(dateCreated)
  let dateNow = new Date()
  var diff = (dateNow - dateDB);
  //86400000 === 24 hours

  return (
    <div className="card-info">
      <div className="top-container">
        <ImageSlider photoList={photoList} />
        <div className="info-gallery">
          <h1>{title}</h1>
          <div className="flex-box">
            <h3>Owner :</h3>
            <h2 onClick={()=>getCardsOfUser()}>{user.name}</h2>
          </div>
          <div className="flex-box">
            <h3>Type :</h3>
            <h2>{type}</h2>
          </div>
          <div className="flex-box">
            <h3>Social media :</h3>
            <div className="media-link">
              {faceBookLink !== null ?
                <a href={`https://facebook.com/${faceBookLink}`} target="_blank"><Facebook/></a>
                  :
                <></>}
              {
                whatsAppLink !== null ?
                 <a href={`https://wa.me//961${whatsAppLink}`} target="_blank"><WhatsApp/></a>
                  :
                 <></> 
              }
              {instagramLink !== null?
                <a href={`https://instagram.com/${instagramLink}`} target="_blank"><Instagram/></a>
                  :
                <></>}
            </div>
          </div>
          <div className="flex-box">
            <h3>Created on :</h3>
            <h2>{diff>=86400000?dateDB.toLocaleString('ar-EG'):dateDB.toLocaleTimeString('ar-EG')}</h2>
          </div>
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