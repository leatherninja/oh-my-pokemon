import React from 'react'
import PokemonCard from '../pokemonCard/pokemonCard'
import { useSelector } from 'react-redux'
import './pokemonList.scss'

const PokemonList = () => {
  const { pokemons } = useSelector(state => state.pokemon)
  return (
    <div className="pokemon-list pokemon-list--adapt-default">
      {pokemons.map(pokemon => (
          <div key={pokemon.name}>
            <PokemonCard pokemon={pokemon}/>
          </div>
      )
      )}
    </div>
  )
}

export default PokemonList
