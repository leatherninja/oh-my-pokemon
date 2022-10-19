import React from 'react'

import { Multiselect } from 'multiselect-react-dropdown'

const CustomMultiSelect = ({
  options,
  onSelectTypesHandler,
  onRemoveSelectTypesHandler,
  selectedValues,
  placeholder,
  className
}) => {
  const onSelect = (typesList) => {
    onSelectTypesHandler(typesList)
  }

  const onRemove = (typesList) => {
    onRemoveSelectTypesHandler(typesList)
  }

  return (
    <Multiselect
      options={options}
      onSelect={typesList => onSelect(typesList)}
      onRemove={typeList => onRemove(typeList)}
      displayValue='name'
      selectedValues={selectedValues}
      placeholder={placeholder}
      className={className}
    />
  )
}

export default CustomMultiSelect
