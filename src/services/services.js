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

export const fetchPokemons = (limit) => {
  return fetchData({ url: `pokemon/?limit=${limit}`, method: 'get' })
}

export const fetchPokemonByName = (name) => {
  return fetchData({ url: `pokemon/${name}`, method: 'get' })
}
