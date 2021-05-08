import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false);
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        setPokemon(res.data.results.map(p => p.name));
      })

    return cancel;
  }, [currentPageUrl]);

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  if (loading) return 'Loading...';

  return (
    <>
      <PokemonList pokemon={pokemon}></PokemonList>
      <Pagination
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
      >
      </Pagination>
    </>
  );
}

export default App;
