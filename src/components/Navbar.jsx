import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-10 items-center justify-center rounded-full p-5 bg-gradient-to-r from-indigo-500 '>
      <NavLink to="/" className='border-2 border-cyan-500 text-white px-12  py-3 max-md:px-8 text-sm max-sm:px-6 rounded-full tracking-widest uppercase  font-bold bg-transparent hover:bg-gradient-to-r from-indigo-500 from-10% via-sky-500  hover:text-white dark:text-neutral-200 transition duration-200'>
      Home  
      </NavLink>
    
      <NavLink to="/pastes" className='border-2 border-cyan-500 text-white px-12 py-3 max-md:px-8 text-sm max-sm:px-6  rounded-full tracking-widest uppercase  font-bold bg-transparent hover:bg-gradient-to-r from-indigo-500 from-10% via-sky-500  hover:text-white dark:text-neutral-200 transition duration-200'>
      Content  
      </NavLink>
    </div>
  )
}

export default Navbar
