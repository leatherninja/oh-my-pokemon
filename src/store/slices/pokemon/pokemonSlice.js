import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchPokemonByName,
  fetchPokemonByType,
  fetchPokemons,
  fetchPokemonTypes
} from '../../../services/services'

const initialState = {
  pokemons: [],
  process: false,
  errorMessage: null,
  totalPokemonsCount: 1,
  allTypes: [],
  selectedTypes: []
}

export const getPokemons = createAsyncThunk(
  'pokemon/getPokemons',
  async ({ limit, offset }, { rejectWithValue, dispatch }) => {
    const pokemonList = []

    const result = await fetchPokemons(limit, offset)

    dispatch(setTotalPokemonsCount(result.data.count))

    for (const pokemon of result.data.results) {
      const response = await fetchPokemonByName(pokemon.name)
      pokemonList.push(response.data)
    }
    dispatch(setPokemons(pokemonList))
  }
)

export const getPokemonByName = createAsyncThunk(
  'pokemon/getPokemonByName',
  async (name, { rejectWithValue, dispatch }) => {
    const response = await fetchPokemonByName(name)

    dispatch(setPokemons([response.data]))
  }
)

export const getPokemonTypes = createAsyncThunk(
  'pokemon/getPokemonTypes',
  async (name, { rejectWithValue, dispatch }) => {
    const response = await fetchPokemonTypes()

    dispatch(setPokemonTypes(response.data.results))
  }
)

export const getPokemonByType = createAsyncThunk(
  'pokemon/getPokemonByType',
  async (typeList, { rejectWithValue, dispatch }) => {
    const pokemonList = []

    dispatch(clearPokemonList())

    for (const t of typeList) {
      const response = await fetchPokemonByType(t.name)
      const pokemon = response.data?.pokemon

      for (const p of pokemon) {
        const name = p.pokemon.name
        const response = await fetchPokemonByName(name)

        pokemonList.push(response.data)
      }
    }
    dispatch(setTotalPokemonsCount(pokemonList.length))
    dispatch(setPokemons(pokemonList))
  }
)

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, { payload }) => {
      state.pokemons = payload
    },
    setTotalPokemonsCount: (state, { payload }) => {
      state.totalPokemonsCount = payload
    },
    setSelectedTypes: (state, { payload }) => {
      state.selectedTypes = payload
    },
    setPokemonTypes: (state, { payload }) => {
      state.allTypes = payload
    },
    clearPokemonList: (state) => {
      state.pokemons = []
    }
  },
  extraReducers: {
    [getPokemons.fulfilled]: (state) => {
      state.process = false
    },
    [getPokemons.pending]: (state) => {
      state.process = true
      state.errorMessage = ''
    },
    [getPokemons.rejected]: (state) => console.log('rejected'),

    [getPokemonByName.fulfilled]: (state) => {
      state.process = false
    },
    [getPokemonByName.pending]: (state) => {
      state.process = true
    },
    [getPokemonByName.rejected]: (state) => {
      console.log('rejected')
    },

    [getPokemonTypes.fulfilled]: (state) => {
    },
    [getPokemonTypes.pending]: (state) => {
    },
    [getPokemonTypes.rejected]: (state) => {
      console.log('rejected')
    },

    [getPokemonByType.fulfilled]: (state) => {
      state.process = false
    },
    [getPokemonByType.pending]: (state) => {
      state.process = true
    },
    [getPokemonByType.rejected]: (state) => {
      console.log('rejected')
    }
  }
})

export const {
  setPokemons,
  setTotalPokemonsCount,
  setPokemonTypes,
  setSelectedTypes,
  clearPokemonList
} = pokemonSlice.actions
export default pokemonSlice.reducer
