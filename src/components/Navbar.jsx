import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {Hamburger,Close} from './Svg.jsx'

const Navbar = () => {

  
  const [isOpen,setIsOpen] = useState(false)
  return (
    <>
      <div className="nav-logo center">
        <h4><Link to="/">Lebanese Homemade</Link></h4>
      </div>
      <div className={isOpen?"nav-link":"nav-link nav-mobile"}>
        <ul>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/contactus">Contact us</Link></li>
          <li><Link to="/aboutus">About us</Link></li>
          <li><Link to="/signin">Log in</Link></li>
        </ul>
      </div>
      <div onClick={()=>setIsOpen(!isOpen)} className="nav-burger">
        {isOpen?<Close/> : <Hamburger/>}
      </div>
    </>
  )
}

export default Navbar
