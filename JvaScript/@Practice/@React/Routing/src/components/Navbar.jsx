import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {


    return (

        <div className='Navbar w-[100%] h-[10vh] flex bg-black'>

            <nav className='flex gap-5 w-[100vh]'>

                <ul className='flex gap-5 text-white'>

                    <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/"><li>Home</li></NavLink>

                    <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/login"><li>Login</li></NavLink>

                    <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/about"><li>Aout</li></NavLink>

                    <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/user/mdnoyun198"><li>User</li></NavLink>

                </ul>
            </nav>
        </div>
    )
}

export default Navbar
