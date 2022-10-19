import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearPokemonList, getPokemonByName } from '../../store/slices/pokemon/pokemonSlice'

import './pokemonPage.scss'

const PokemonPage = () => {
  const { pokemons } = useSelector(state => state.pokemon)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const name = searchParams.get('name') || ''

  useEffect(() => {
    dispatch(clearPokemonList())
    dispatch(getPokemonByName(name))
  }, [name])

  return (
    <div className='pokemon-page'>
      <div className='container'>
        <div className='pokemon-avatar'>
          <img src={pokemons[0]?.sprites.other.dream_world.front_default} alt=''/>
        </div>
        <div className='pokemon-name'>
          {pokemons[0]?.name}
        </div>
      </div>
    </div>
  )
}

export default PokemonPage
