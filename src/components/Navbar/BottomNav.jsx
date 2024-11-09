import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import { BsPencilSquare } from 'react-icons/bs'

const BottomNav = () => {
  return (
    <div className='flex justify-between items-center px-7 h-[50px] text-xl'>
      <Link to='/'>
        <AiFillHome />
      </Link>
      <Link to='/profile'>
        <FaRegCircleUser />
      </Link>
      <Link to='/'>
        <FiSearch />
      </Link>
      <Link to='/'>
        <BsPencilSquare />
      </Link>
    </div>
  )
}

export default BottomNav
