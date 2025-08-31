import React from 'react'
import './style.css';
const Navbar = (props) => {
  return (
    <div>
      <div>{props.LogoText}</div>
      <ul className='nav'>
        <li>Home</li>
        <li>About</li>
        <li>Contact Us</li>
      </ul>
    </div>
  )
}

export default Navbar
