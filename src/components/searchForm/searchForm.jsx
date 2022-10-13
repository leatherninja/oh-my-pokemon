import React, { useState } from 'react'

const SearchForm = ({ searchHandler }) => {
  const [searchValue, setSearchValue] = useState()

  const onSubmit = e => {
    e.preventDefault()
    searchHandler(searchValue)
    setSearchValue('')
  }

  return (
    <form onSubmit={e => onSubmit(e)}>
      <input
        type="search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <button>Найти</button>
    </form>
  )
}

export default SearchForm
