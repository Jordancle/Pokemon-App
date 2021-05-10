import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import SpriteDisplay from './SpriteDisplay';
import axios from 'axios';
import PokemonTypes from './PokemonTypes';

const nullPokemon = {
  sprites: {front_default: undefined}
}

function App() {
  const [pokemon, setPokemon] = useState(nullPokemon);
  const [listPokemon, setListPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [spriteUrl, setSpriteUrl] = useState();
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokedexId, setPokedexId] = useState();
  const [generation, setGeneration] = useState('');
  const [currentRandomPokedexId, setCurrentRandomPokedexId] = useState();

  useEffect(() => {
    const pokedexId = Math.floor(Math.random() * 898);
    setLoading(true);
    setPokedexId(pokedexId);
    // setCurrentRandomPokedexId(pokedexId);
    Promise.all([GetPokemonInfo(pokedexId), GetPokemonSpeciesInfo(pokedexId)])
      .then(results => {
        setLoading(false);
        const pokemon = results[0].data;
        setSpriteUrl(pokemon.sprites.front_default);
        setPokemonName(pokemon.name);
        setPokemonTypes(pokemon.types.map(t => t.type.name));

        const species = results[1].data;
        setGeneration(species.generation.name);
      });
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   let cancel;
  //   axios.get(currentPageUrl, {
  //     cancelToken: new axios.CancelToken(c => cancel = c)
  //   })
  //     .then(res => {
  //       setLoading(false);
  //       setPrevPageUrl(res.data.previous);
  //       setNextPageUrl(res.data.next);
  //       setListPokemon(res.data.results.map(p => p.name));
  //     })

  //   return cancel;
  // }, [currentPageUrl]);

  // useEffect(() => {
  //   GetPokemonInfo(currentRandomPokedexId);
  // }, [currentRandomPokedexId]);

  // useEffect(() => {
  //   setCurrentSpriteUrl(pokemon.sprites.front_default);
  // }, [pokemon]);

  function GetPokemonInfo(pokedexId) {
    // setLoading(true);
    // let cancel;
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokedexId);
      // .then(p => {
      //   // setLoading(false);
      //   // setPokemon(p.data);
      //   const pokemon = p.data;
      //   setSpriteUrl(pokemon.sprites.front_default);
      //   setPokemonName(pokemon.name);
      //   setPokemonTypes(pokemon.types.map(t => t.type.name));
      // });
      
    // return cancel;
  }

  function GetPokemonSpeciesInfo(pokedexId) {
    // setLoading(true);
    // let cancel;
    return axios.get('https://pokeapi.co/api/v2/pokemon-species/' + pokedexId);
      // .then(p => {
      //   // setLoading(false);
      //   const pokemon = p.data;
      //   setGeneration(pokemon.generation.name);
      // });
  }

  // function gotoPrevPage() {
  //   setCurrentPageUrl(prevPageUrl);
  // }

  // function gotoNextPage() {
  //   setCurrentPageUrl(nextPageUrl);
  // }

  if (loading) return 'Loading...';

  return (
    <>
      {/* <PokemonList pokemon={listPokemon}></PokemonList>
      <Pagination
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
      >
      </Pagination> */}
      <div>
        {spriteUrl && <SpriteDisplay spriteUrl={spriteUrl} /> }
      </div>
      <div>
        {pokemonName.replace(/\b\w/g, l => l.toUpperCase())}
      </div>
      <div>
        Pokedex Number #{pokedexId}
      </div>
      <div>
        {generation.replace(/\b\w/g, l => l.toUpperCase())}
      </div>
      <PokemonTypes types={pokemonTypes}></PokemonTypes>
    </>
  );
}

export default App;
