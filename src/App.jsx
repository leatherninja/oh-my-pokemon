import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearPokemonList, getPokemons } from './store/slices/pokemon/pokemonSlice'
import './App.scss'

const App = () => {
  const { pokemons } = useSelector(state => state.pokemon)
  const [limit, setLimit] = useState(10)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearPokemonList())
    dispatch(getPokemons(limit))
  }, [limit])

  const limitHandler = e => {
    setLimit(e.target.value)
  }

  return (
    <div className='App'>
      <div>
        <input type='radio' name="limit" id="10" value={10} onChange={e => limitHandler(e) }/>
        <input type='radio' name="limit" id="20" value={20} onChange={e => limitHandler(e) }/>
        <input type='radio' name="limit" id="50" value={50} onChange={e => limitHandler(e) }/>
      </div>
      {pokemons.map(pokemon => (
          <div key={pokemon.id} className='pokemon-card'>
            {pokemon.name}
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt=''
              style={{ width: 80 }}
            />
          </div>
      )
      )}
    </div>
  )
}

export default App
