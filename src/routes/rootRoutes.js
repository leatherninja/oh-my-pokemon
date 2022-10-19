import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PokemonPage from '../pages/pokemonPage/pokemonPage'
import MainPage from '../pages/mainPage/mainPage'

const RootRoutes = () => {
  return (
    <Routes>
      <Route index path='/' element={<MainPage/>}/>
      <Route path='pokemon/' element={<PokemonPage/>}/>
    </Routes>
  )
}

export default RootRoutes
