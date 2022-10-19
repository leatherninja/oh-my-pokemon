import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearPokemonList, getPokemons, setPokemons } from './store/slices/pokemon/pokemonSlice'
import './App.scss'
import PokemonList from './components/pokemonList/pokemonList'
import Header from './components/header/header'
import RadioInput from './components/inputs/radioInput/radioInput'
import Loader from './components/loader/loader'
import SearchForm from './components/searchForm/searchForm'
import { fetchPokemonByName } from './services/services'
import RootRoutes from './routes/rootRoutes'

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <RootRoutes/>
    </div>
  )
}

export default App
