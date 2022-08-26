import React from 'react'
//component
import { Facebook,Instagram,WhatsApp } from './Svg'

const CardPopUpMedia = (props) => {

  const {faceBookLink,instagramLink,whatsAppLink} = props

  return (
    <>
      {
        faceBookLink !== null ?
        <a href={`https://facebook.com/${faceBookLink}`} target="_blank"><Facebook/></a>
        :
        <></>
      }
      {
        whatsAppLink !== null ?
        <a href={`https://wa.me//961${whatsAppLink}`} target="_blank"><WhatsApp/></a>
        :
        <></> 
      }
      {
        instagramLink !== null?
        <a href={`https://instagram.com/${instagramLink}`} target="_blank"><Instagram/></a>
        :
        <></>
      }
    </>
  )
}

export default CardPopUpMedia