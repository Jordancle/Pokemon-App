import React from 'react'

export default function PokemonTypes({ types }) {
  return (
    <div>
      {/* {types.map(t => (
        <div key={t}>{t}</div>
      ))} */}
      {types.join(', ').replace(/\b\w/g, l => l.toUpperCase())}
    </div>
  )
}
