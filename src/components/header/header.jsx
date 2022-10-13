import React from 'react'
import './header.scss'
import logo from '../../assets/images/logo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="logo" className="logo__img"/>
      </div>
    </header>
  )
}

export default Header
