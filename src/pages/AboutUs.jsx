import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className="about-page">
      <h1>about us</h1>
      <p>Lebanese Homemade is a free advertisement platform for small business owners in lebanon.</p>
      <div className="about-btn-option">
        <Link to='/signup'>promote your business for free</Link>
        <Link to='/contactus'>send us your suggestion</Link>
      </div>
    </div>
  )
}

export default AboutUs