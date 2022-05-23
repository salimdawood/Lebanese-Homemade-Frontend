import React from 'react'
import {Facebook,Twitter,Instagram} from './Svg'

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
        <Twitter/>
      </div>
      <span>&copy;copyright 2022</span>
    </>
  )
}

export default Footer