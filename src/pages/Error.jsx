import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h3>opps! page not found</h3>
      <p>Sorry, the page you are looking for doesn't exist.If you think something is broken, report a problem.</p>
      <div className="error-btn-option">
        <Link to='/'>return home</Link>
        <Link to='/contactus'>report problem</Link>
      </div>
    </div>
  )
}

export default Error