import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearPokemonList, getPokemonByType,
  getPokemons,
  getPokemonTypes
} from '../../store/slices/pokemon/pokemonSlice'

import SearchForm from '../../components/searchForm/searchForm'
import Loader from '../../components/loader/loader'
import PokemonList from '../../components/pokemonList/pokemonList'
import RadioGroup from '../../components/radioGroup/radioGroup'
import CustomMultiSelect from '../../components/inputs/multiSelect/multiSelect'

import './mainPage.scss'

const MainPage = () => {
  const { process, allTypes } = useSelector(state => state.pokemon)
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  const limit = searchParams.get('limit') || 10
  const types = searchParams.get('types')

  const onSelectTypesHandler = (typesList) => {
    const _types = JSON.stringify(typesList)
    setSearchParams({ types: _types, limit })
    dispatch(getPokemonByType(typesList))
  }

  const onRemoveSelectTypesHandler = (typesList) => {
    if (typesList.length > 0) {
      const _types = JSON.stringify(typesList)
      setSearchParams({ types: _types, limit })
      dispatch(getPokemonByType(typesList))
    } else {
      setSearchParams({ limit })
      dispatch(getPokemons(limit))
    }
  }

  useEffect(() => {
    if (types) {
      const _types = JSON.parse(types)
      dispatch(getPokemonByType(_types))
    } else {
      dispatch(clearPokemonList())
      dispatch(getPokemons({ limit }))
    }
  }, [limit, types])

  useEffect(() => {
    if (allTypes.length === 0) {
      dispatch(getPokemonTypes())
    }
  }, [types])

  return (
    <div className='container'>
       <div className='search-block'>
        <SearchForm limit={limit}/>
      </div>
      <div className='multiselect-block'>
        <CustomMultiSelect
          options={allTypes}
          onSelectTypesHandler={onSelectTypesHandler}
          onRemoveSelectTypesHandler={onRemoveSelectTypesHandler}
          selectedValues={JSON.parse(types)}
          placeholder={'Выберите тип покемона'}
          className={'type-multiselect'}
        />
      </div>
      {!types && <div className='radio-group-block'>
        <RadioGroup/>
      </div>}
      {process
        ? <Loader/>
        : <PokemonList/>
      }
    </div>
  )
}

export default MainPage
