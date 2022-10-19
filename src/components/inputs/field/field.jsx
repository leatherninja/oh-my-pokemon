import React, { useState } from 'react'

import './field.scss'

const Field = ({
  type = 'text',
  name,
  label,
  defaultValue,
  onChangeHandler,
  placeholder
}) => {
  const [value, setValue] = useState('')

  const onChange = e => {
    setValue(e.target.value)
    onChangeHandler(e)
  }

  return (
    <div className='field'>
      <input
        className='field__input'
        type={type}
        value={value || defaultValue}
        name={name}
        placeholder={placeholder}
        onChange={e => onChange(e)}
      />
      <label htmlFor={name} className='field__label'>{label}</label>
      {type === 'search' &&
      <button
        className='field__search-btn'
        disabled={!value}
      >
        Найти
      </button>
      }
    </div>
  )
}

export default Field
