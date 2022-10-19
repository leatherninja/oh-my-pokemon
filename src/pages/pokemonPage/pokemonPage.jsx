import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearPokemonList, getPokemonByName, getPokemonEvolutionChain } from '../../store/slices/pokemon/pokemonSlice'

import { formatName } from '../../helpers/helpers'

import './pokemonPage.scss'

const PokemonPage = () => {
  const { pokemons, evolution } = useSelector(state => state.pokemon)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const name = searchParams.get('name') || ''
  const pokemon = pokemons[0]

  const { order, sprites, stats, weight, height } = pokemon || {}

  const avatar = sprites?.other.dream_world.front_default

  useEffect(() => {
    dispatch(clearPokemonList())
    dispatch(getPokemonByName(name))
    dispatch(getPokemonEvolutionChain(name))
  }, [name])

  return (
    <div className="pokemon-page pokemon-page--adapt-default">
      <div className="container">
        <div className="pokemon-info">
          <div className="pokemon-avatar">
            <div className="pokemon-order">
              <span>#{order}</span>
            </div>
            <div className="pokemon-avatar__img">
              <img src={avatar} alt={name}/>
            </div>
            <div className="pokemon-name">
              {formatName(name)}
            </div>
          </div>
          <div className="pokemon-param">
            <b className="param-title">Параметры</b>
            <div className="pokemon-height">
              <span>Height:</span>
              <span>{height} m</span>
            </div>
            <div className="pokemon-weight">
              <span>Weight:</span>
              <span>{weight} Kg</span>
            </div>
            <p></p>
          </div>
          <div className="pokemon-evolution">
            <b className='evolution-title'>Эволюция</b>
            <div className="evolution-items">
              {evolution && evolution.map(e => {
                return (
                  <div className="evolution-item">
                    <div className="evolution-item__avatar">
                      <img src={e.avatar} alt=""/>
                    </div>
                     <div className="evolution-item__name">
                      {formatName(e.name)}
                     </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='go-to-main-btn' >
          <NavLink to='/'>На главную</NavLink>
        </div>
      </div>
    </div>
  )
}

export default PokemonPage
