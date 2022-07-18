import React from 'react'
import {LinkedIn,GitHub} from './Svg'

const Footer = () => {
  //change icons
  //change copyright
  //change paragraph if found better
  return (
    <>
      <span>Developed By Salim Dawood</span>
      <div className="footer-media-container">
        <a href='https://github.com/salimdawood' target='_blank'><GitHub/></a>
        <a href='https://linkedin.com/in/salim-dawood-0618a8241' target='_blank'><LinkedIn/></a>
      </div>
      <span>&copy;copyright 2022</span>
    </>
  )
}

export default Footer