import React from 'react'
import ThemeToggle from './ThemeToggle'
import {BsCreditCard} from '@react-icons/all-files/bs/BsCreditCard'

const Header = () => {
  return (
    <div className="flex mt-4 h-20 justify-between items-center align-center" id="top">
      <BsCreditCard size={30} className="rotate-45 ml-6 cursor-pointer"/>
      <h1 className='text-2xl font-bold'>Currency Lookup</h1>
        <ThemeToggle />
    </div>
  )
}

export default Header