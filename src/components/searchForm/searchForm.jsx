import React, { useState } from 'react'
import './searchForm.scss'
import Field from '../inputs/field/field'
import { fetchPokemonByName } from '../../services/services'
import { clearPokemonList, getPokemons, setPokemons } from '../../store/slices/pokemon/pokemonSlice'
import { useDispatch } from 'react-redux'

const SearchForm = ({ limit }) => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async e => {
    e.preventDefault()
    const response = await fetchPokemonByName(searchValue.toLowerCase())
    dispatch(clearPokemonList())
    dispatch(setPokemons(response.data))
    console.log(response)
  }
  const onChange = (e) => {
    setSearchValue(e.target.value)
    if (!e.target.value) {
      dispatch(clearPokemonList())
      dispatch(getPokemons(limit))
    }
  }
  return (
    <form onSubmit={e => onSubmit(e)} className="search-form">
      <Field
        type="search"
        name="search_pokemon"
        onChangeHandler={e => onChange(e)}
      />
    </form>
  )
}

export default SearchForm
