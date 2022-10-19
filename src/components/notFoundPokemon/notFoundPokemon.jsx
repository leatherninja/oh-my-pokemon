import React from 'react'

import pikachu from '../../assets/images/sad-pika.png'

import './notFoundPokemon.scss'

const NotFoundPokemon = () => {
  return (
    <div className='not-found-pokemon'>
      <div className='not-found-pokemon__title'><b>Покемон с таким именем не найден...</b></div>
      <div className='not-found-pokemon__image'>
        <img src={pikachu} alt='not-found'/>
      </div>
    </div>
  )
}

export default NotFoundPokemon
