import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchPokemonByName, fetchPokemons } from '../../../services/services'

const initialState = {
  pokemons: [],
  pokemon: null
}

export const getPokemons = createAsyncThunk(
  'pokemon/getPokemons',
  async (limit, { rejectWithValue, dispatch }) => {
    const result = await fetchPokemons(limit)

    for (const pokemon of result.data.results) {
      const response = await fetchPokemonByName(pokemon.name)
      dispatch(setPokemons(response.data))
    }
  }
)

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, { payload }) => {
      state.pokemons.push(payload)
    },
    clearPokemonList: (state) => {
      state.pokemons = []
    }
  },
  extraReducers: {
    [getPokemons.fulfilled]: () => console.log('fullfield'),
    [getPokemons.pending]: () => console.log('pending'),
    [getPokemons.rejected]: () => console.log('rejected')
  }
})

export const {
  setPokemons,
  clearPokemonList
} = pokemonSlice.actions
export default pokemonSlice.reducer
