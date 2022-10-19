import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import RadioInput from '../inputs/radioInput/radioInput'

import './radioGroup.scss'

const RadioGroup = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const limitHandler = value => {
    setSearchParams({ limit: value })
  }

  return (
    <div className='radio-group radio-group--adapt-default'>
      <RadioInput
        id='10'
        name='limit'
        value={10}
        label='Показать по 10'
        onChangeHandler={e => limitHandler(e)}
      />
      <RadioInput
        id='20'
        name='limit'
        value={20}
        label='Показать по 20'
        onChangeHandler={e => limitHandler(e)}
      />
      <RadioInput
        id='50'
        name='limit'
        value={50}
        label='Показать по 50'
        onChangeHandler={e => limitHandler(e)}
      />
    </div>
  )
}

export default RadioGroup
