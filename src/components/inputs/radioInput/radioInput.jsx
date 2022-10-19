import React from 'react'

import './radioInput.scss'

const RadioInput = ({
  value,
  id,
  name,
  label,
  onChangeHandler = () => {}
}) => {
  const onChange = (e) => {
    onChangeHandler(e)
  }
  return (
    <div className="radio-input radio-input--adapt-default">
      <input
        type="radio"
        value={value}
        id={id}
        name={name}
        onChange={ e => onChange(e.target.value)}
        className="radio-input__input"
      />
      <label
        htmlFor={id}
        className="radio-input__label"
      >
        {label}
      </label>
    </div>
  )
}

export default RadioInput
