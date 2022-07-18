import React,{useState} from 'react'
import { Link,useLocation } from 'react-router-dom'
//component
import {Hamburger,Close} from './Svg.jsx'

const Navbar = () => {
  
  const [isOpen,setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <div className="nav-logo center">
        <h4><Link to="/">Lebanese Homemade</Link></h4>
      </div>
      <div className={isOpen?"nav-link":"nav-link nav-mobile"}>
        <ul>
          <li>
            <Link className={location.pathname.includes('/signup')?"active":""} to="/signup">Sign up</Link>
          </li>
          <li>
            <Link className={location.pathname.includes('/contactus')?"active":""} to="/contactus">Contact us</Link>
          </li>
          <li>
            <Link className={location.pathname.includes('/aboutus')?"active":""} to="/aboutus">About us</Link>
          </li>
          <li>
            <Link className={location.pathname.includes('signin')?"active":""} to="/signin">Log in</Link>
          </li>
        </ul>
      </div>
      <div onClick={()=>setIsOpen(!isOpen)} className="nav-burger">
        {isOpen?<Close/> : <Hamburger/>}
      </div>
    </>
  )
}

export default Navbar
