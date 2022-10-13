import React from 'react'
import loader from '../../assets/images/loader.gif'

import './loasder.scss'

const Loader = () => {
  return (
    <div className="loader" >
      <img className="loader__img" src={loader} alt="load..."/>
    </div>
  )
}

export default Loader
