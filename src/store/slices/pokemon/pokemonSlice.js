import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchPokemonByName,
  fetchPokemonByType,
  fetchPokemonEvolutionChain,
  fetchPokemons, fetchPokemonSpecies,
  fetchPokemonTypes
} from '../../../services/services'

const initialState = {
  pokemons: [],
  process: false,
  errorMessage: null,
  totalPokemonsCount: 1,
  allTypes: [],
  selectedTypes: [],
  evolution: null
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

export const getPokemonEvolutionChain = createAsyncThunk(
  'pokemon/getPokemonTypes',
  async (name, { rejectWithValue, dispatch }) => {
    const response = await fetchPokemonSpecies(name)
    const evolutionChainId = response.data.evolution_chain.url.split('/')[6]
    const evolutionChain = await fetchPokemonEvolutionChain(evolutionChainId)

    const firstGeneration = evolutionChain.data.chain?.species?.name
    const secondGeneration = evolutionChain.data.chain?.evolves_to[0]?.species?.name
    const thirdGeneration = evolutionChain.data.chain?.evolves_to[0]?.evolves_to[0]?.species?.name
    const generationsNames = [firstGeneration, secondGeneration, thirdGeneration]
    const evolution = []
    for (const name of generationsNames) {
      const response = await fetchPokemonByName(name)
      const generation = {
        name,
        avatar: response.data.sprites?.other.dream_world.front_default
      }
      evolution.push(generation)
    }
    dispatch(setPokemonEvolution(evolution))
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
    setPokemonTypes: (state, { payload }) => {
      state.allTypes = payload
    },
    setPokemonEvolution: (state, { payload }) => {
      state.evolution = payload
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
    },

    [getPokemonEvolutionChain.fulfilled]: (state) => {
    },
    [getPokemonEvolutionChain.pending]: (state) => {
    },
    [getPokemonEvolutionChain.rejected]: (state) => {
      console.log('rejected')
    }
  }
})

export const {
  setPokemons,
  setTotalPokemonsCount,
  setPokemonTypes,
  setPokemonEvolution,
  clearPokemonList
} = pokemonSlice.actions

export default pokemonSlice.reducer
