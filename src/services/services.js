import axios from 'axios'

const _url = url => `https://pokeapi.co/api/v2/${url}`

const fetchData = async ({ url, method, data }) => {
  try {
    const response = await axios({
      url: _url(url),
      method,
      data
    })
    return response
  } catch (e) {
    console.log(e)
  }
}

export const fetchPokemons = (limit, offset) => {
  return fetchData({ url: `pokemon/?offset=${offset}&limit=${limit}`, method: 'get' })
}
export const fetchPokemonTypes = () => {
  return fetchData({ url: 'type/', method: 'get' })
}

export const fetchPokemonByType = (type, offset, limit) => {
  return fetchData({ url: `type/${type}?offset=0&limit=10`, method: 'get' })
}

export const fetchPokemonByName = (name) => {
  return fetchData({ url: `pokemon/${name}`, method: 'get' })
}
export const fetchPokemonEvolution = (id) => {
  return fetchData({ url: `evolution-chain/${id}`, method: 'get' })
}
