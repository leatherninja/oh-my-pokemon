import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearPokemonList, getPokemons } from './store/slices/pokemon/pokemonSlice'
import './App.scss'
import PokemonList from './components/pokemonList/pokemonList'
import Header from './components/header/header'
import RadioInput from './components/inputs/radioInput/radioInput'
import Loader from './components/loader/loader'
import SearchForm from './components/searchForm/searchForm'
import { fetchPokemonByName } from './services/services'

const App = () => {
  const [limit, setLimit] = useState(10)
  const { process } = useSelector(state => state.pokemon)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearPokemonList())
    dispatch(getPokemons(limit))
  }, [limit])

  const limitHandler = value => {
    setLimit(value)
  }
  const searchPokemonByName = async (name) => {
    const response = await fetchPokemonByName(name.toLowerCase())
    console.log(response)
  }
  return (
    <div className="App">
      <Header/>
      <div className="container">
        <SearchForm searchHandler={searchPokemonByName} />
        <div className="radio-group">
          <RadioInput id="10" name="limit" value={10} label="10" onChangeHandler={e => limitHandler(e)}/>
          <RadioInput id="20" name="limit" value={20} label="20" onChangeHandler={e => limitHandler(e)}/>
          <RadioInput id="50" name="limit" value={50} label="50" onChangeHandler={e => limitHandler(e)}/>
        </div>
        {process ? <Loader/> : <PokemonList/>}
      </div>
    </div>
  )
}

export default App
