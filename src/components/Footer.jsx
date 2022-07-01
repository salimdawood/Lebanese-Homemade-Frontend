import React from 'react'
import {Facebook,Instagram} from './Svg'

const Footer = () => {
  //change icons
  //change copyright
  //change paragraph if found better
  return (
    <>
      <span>Developed By <a href="/#">Salim Dawood</a></span>
      <div className="footer-media-container">
        <Facebook/>
        <Instagram/>
      </div>
      <span>&copy;copyright 2022</span>
    </>
  )
}

export default Footer