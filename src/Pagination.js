import React from 'react'

export default function Pagination({ gotoPrevPage, gotoNextPage }) {
  return (
    <>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </>
  )
}
