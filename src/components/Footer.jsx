import React from 'react'
//components
import {LinkedIn,GitHub} from './Svg'

const Footer = () => {

  let dateNow = new Date().getFullYear() === 2022?'':'-'+new Date().getFullYear()

  return (
    <>
      <span>Developed By Salim Dawood</span>
      <div className="footer-media-container">
        <a href='https://github.com/salimdawood' target='_blank' rel="noreferrer"><GitHub/></a>
        <a href='https://linkedin.com/in/salim-dawood-0618a8241' target='_blank' rel="noreferrer"><LinkedIn/></a>
      </div>
      <span>&copy;Copyright 2022{dateNow}</span>
    </>
  )
}

export default Footer