import React from 'react'

import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'

import './header.scss'

const Header = () => {
  return (
    <header className='header'>
      <Link to="/" >
        <div className='logo'>
          <img src={logo} alt='logo' className='logo__img'/>
        </div>
      </Link>
    </header>
  )
}

export default Header
