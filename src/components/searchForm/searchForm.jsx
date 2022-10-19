import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { clearPokemonList, setPokemons } from '../../store/slices/pokemon/pokemonSlice'

import Field from '../inputs/field/field'

import './searchForm.scss'

const SearchForm = ({ limit }) => {
  const { pokemons } = useSelector(state => state.pokemon)
  const [searchValue, setSearchValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()
  }

  const onChange = (e) => {
    setSearchValue(e.target.value.toLowerCase())
    setSearchParams({ limit, search: e.target.value.toLowerCase() })
    if (!e.target.value) {
      dispatch(clearPokemonList())
      dispatch(setPokemons(pokemons))
    }
  }
  return (
    <form onSubmit={e => onSubmit(e)} className='search-form'>
      <Field
        type='text'
        name='search_pokemon'
        onChangeHandler={e => onChange(e)}
        defaultValue={searchParams.get('search')}
        placeholder={'Введите название покемона'}
      />
    </form>
  )
}

export default SearchForm
