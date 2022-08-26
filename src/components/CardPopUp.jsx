import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
//components
import ImageSlider from './ImageSlider'
import ItemTable from './ItemTable'
import CardPopUpMedia from './CardPopUpMedia'
//
import dateBeautify from '../constantVariables/dateBeautify'

const CardPopUp = (props) => {
  const {title,type,photoList,menu,instagramLink,faceBookLink,whatsAppLink,dateCreated,user,setCardModel} = props

  const navigate = useNavigate()
  const location = useLocation()

  //get userId of the card and allow visitor to see all cards of this user in a different page
  const getCardsOfUser = ()=>{
      if(location.pathname.includes('/cards')){
        setCardModel(false)
      }else{
        navigate(`${user.name}/cards`)
      }

  }

  const mapFunction = (item)=>{
    return  <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
  }
  
  let item_table_props = {
    items:menu.itemList,
    mapFunction
  }
  let card_media_props = {
    faceBookLink,
    instagramLink,
    whatsAppLink
  }

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
            <h2>{type.name}</h2>
          </div>
          <div className="flex-box">
            <h3>Social media :</h3>
            <div className="media-link">
              <CardPopUpMedia {...card_media_props}/>
            </div>
          </div>
          <div className="flex-box">
            <h3>Created on :</h3>
            <h2>{dateBeautify(dateCreated)}</h2>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <ItemTable {...item_table_props}/>
      </div>
    </div>
  )
}

export default CardPopUp