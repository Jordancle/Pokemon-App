import React from 'react'

export default function PokemonTypes({ types }) {
  return (
    <h3>
      {/* {types.map(t => (
        <div key={t}>{t}</div>
      ))} */}
      {types.join(', ').replace(/\b\w/g, l => l.toUpperCase())}
    </h3>
  )
}
