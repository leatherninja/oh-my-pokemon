import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearPokemonList, getPokemonByName, getPokemonEvolution } from '../../store/slices/pokemon/pokemonSlice'

import './pokemonPage.scss'
import { formatName } from '../../helpers/helpers'

const PokemonPage = () => {
  const { pokemons, evolution } = useSelector(state => state.pokemon)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const name = searchParams.get('name') || ''

  const pokemon = pokemons[0]

  const { id, order, sprites, forms, stats, weight, height } = pokemon || {}
  const { chain } = evolution

  const avatar = sprites?.other.dream_world.front_default
  const firstGeneration = chain?.species?.name
  const secondGeneration = chain?.evolves_to[0]?.species?.name
  const thirdGeneration = chain?.evolves_to[0]?.evolves_to[0]?.species?.name

  useEffect(() => {
    dispatch(clearPokemonList())
    dispatch(getPokemonByName(name))
  }, [name])
  useEffect(() => {
    if (id) {
      dispatch(getPokemonEvolution(id))
    }
  }, [id])

  return (
    <div className="pokemon-page">
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
          <div className="pokemon-bio">
            <b>Bio</b>
            <p></p>
          </div>
          <div className="pokemon-evolution">
            <b>Evolution</b>
            <div>
              <span>{firstGeneration}</span>
              <span>{secondGeneration}</span>
              <span>{thirdGeneration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonPage
