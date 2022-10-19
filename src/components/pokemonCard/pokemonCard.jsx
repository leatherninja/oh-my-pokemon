import React from 'react'

import './pokemonCard.scss'

const PokemonCard = ({ pokemon }) => {
  const { name, sprites, types } = pokemon

  const avatar = sprites.other.dream_world.front_default

  const formatName = name => name.split('').map((l, i) => i === 0 ? l.toUpperCase() : l)

  return (
    <div className='pokemon-card pokemon-card--adapt-default'>
      <div className='pokemon-avatar'>
        <img
          className='pokemon-avatar__img'
          src={avatar}
        />
      </div>
      <div className='pokemon-name'>
        <span>{formatName(name)}</span>
      </div>
      {types.map(({ type }, index) => {
        return (
          <div key={`${type}${index}`} className='pokemon-type'>
            <span>{type.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export default PokemonCard
