import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './pagination.scss'

const Pagination = ({ totalItemsCount, paginationHandler }) => {
  const [pageCount, setPageCount] = useState(1)
  const [searchParams] = useSearchParams()

  const limit = searchParams.get('limit') || 10

  useEffect(() => {
    setPageCount(Math.ceil(totalItemsCount / limit)
    )
  }, [])

  const renderPaginationItems = () => {
    let i = 0
    const pages = []

    do {
      ++i
      pages.push(i)
    } while (i !== pageCount)

    return pages.map(page => {
      return <div
        key={page}
        className={'pagination__item'}
        onClick={() => pagination(page)}
      >
        {page}
      </div>
    })
  }

  const pagination = (page) => {
    const offset = (page - 1) * limit
    paginationHandler(limit, offset)
  }

  return (
    <div className='pagination'>
      {renderPaginationItems()}
    </div>
  )
}

export default Pagination
