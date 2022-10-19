import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { clearPokemonList, getPokemonByType, setPokemons } from '../../store/slices/pokemon/pokemonSlice'

import Field from '../inputs/field/field'

import './searchForm.scss'

const SearchForm = ({ limit }) => {
  const { pokemons } = useSelector(state => state.pokemon)
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  const types = searchParams.get('types')

  const onSubmit = e => {
    e.preventDefault()
  }

  const onChange = (e) => {
    if (!e.target.value && types) {
      const _types = JSON.parse(types)
      dispatch(clearPokemonList())
      dispatch(getPokemonByType(_types))
      setSearchParams({ limit, search: e.target.value.toLowerCase(), types })
    }
    if (!e.target.value && !types) {
      dispatch(clearPokemonList())
      dispatch(setPokemons(pokemons))
    }
    if (e.target.value && types) {
      setSearchParams({ limit, search: e.target.value.toLowerCase(), types })
    }
    if (!types) {
      setSearchParams({ limit, search: e.target.value.toLowerCase() })
    }
  }

  return (
    <form onSubmit={e => onSubmit(e)} className="search-form">
      <Field
        type="text"
        name="search_pokemon"
        onChangeHandler={e => onChange(e)}
        defaultValue={searchParams.get('search')}
        placeholder={'Введите название покемона'}
      />
    </form>
  )
}

export default SearchForm
