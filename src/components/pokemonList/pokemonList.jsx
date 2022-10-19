import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

import { clearPokemonList, getPokemons } from '../../store/slices/pokemon/pokemonSlice'

import PokemonCard from '../pokemonCard/pokemonCard'
import Pagination from '../pagination/pagination'
import NotFoundPokemon from '../notFoundPokemon/notFoundPokemon'

import './pokemonList.scss'

const PokemonList = () => {
  const { pokemons, totalPokemonsCount } = useSelector(state => state.pokemon)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const name = searchParams.get('search') || ''
  const types = searchParams.get('types')

  const paginationHandler = (limit, offset) => {
    dispatch(clearPokemonList())
    dispatch(getPokemons({ limit, offset }))
  }

  const filteredPokemonList = pokemons.filter(pokemon => pokemon.name.includes(name)).map(pokemon => (
    <div key={pokemon.name}>
      <Link to={`pokemon?name=${pokemon.name}`}>
        <PokemonCard pokemon={pokemon}/>
      </Link>
    </div>
  ))

  return (
    <div className='pokemon-list pokemon-list--adapt-default'>
      {filteredPokemonList.length > 0
        ? filteredPokemonList
        : <NotFoundPokemon/>
      }
      {!types && filteredPokemonList.length > 0 &&
      <div className='pogenation-block'>
        <Pagination
          totalItemsCount={totalPokemonsCount}
          paginationHandler={paginationHandler}
        />
      </div>}
    </div>
  )
}

export default PokemonList
