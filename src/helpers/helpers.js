
export const formatName = name => name
  .split('')
  .map((l, i) => i === 0 ? l.toUpperCase() : l)
