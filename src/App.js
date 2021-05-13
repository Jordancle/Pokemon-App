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
  const [damageRelations, setDamageRelations] = useState();
  const [doubleDamageFrom, setDoubleDamageFrom] = useState();
  const [quadrupleDamageFrom, setQuadrupleDamageFrom] = useState();
  const [halfDamageFrom, setHalfDamageFrom] = useState();
  const [oneFourthDamageFrom, setOneFourthDamageFrom] = useState();
  const [noDamageFrom, setNoDamageFrom] = useState();
  const [types, setTypes] = useState();

  useEffect(() => {
    const pokedexId = Math.floor(Math.random() * 898);
    // const pokedexId = 397;
    setLoading(true);
    setPokedexId(pokedexId);
    // setCurrentRandomPokedexId(pokedexId);
    Promise.all([GetPokemonInfo(pokedexId), GetPokemonSpeciesInfo(pokedexId), GetTypes()])
      .then(results => {
        
        const pokemon = results[0].data;
        setSpriteUrl(pokemon.sprites.front_default);
        setPokemonName(pokemon.name);
        const types = pokemon.types.map(t => t.type.name);
        setPokemonTypes(types);

        const species = results[1].data;
        setGeneration(species.generation.name);

        Promise.all(types.map(t => axios.get(`https://pokeapi.co/api/v2/type/${t}`)))
        .then(r => {
          setLoading(false);
          let damageCalc = Object.fromEntries(r[0].data.damage_relations.double_damage_from.map(x => [x.name, 2]));
          const halfDamage = Object.fromEntries(r[0].data.damage_relations.half_damage_from.map(x => [x.name, 0.5]));
          Object.keys(halfDamage).forEach(x => {
              damageCalc[x] = 0.5;
          });
          const noDamage = Object.fromEntries(r[0].data.damage_relations.no_damage_from.map(x => [x.name , 0]));
            Object.keys(noDamage).forEach(x => {
                damageCalc[x] = noDamage[x];
            });
          if (r[1]) {
            let asdf = Object.fromEntries(r[1].data.damage_relations.double_damage_from.map(x => [x.name, 2]));
            Object.keys(asdf).forEach(x => {
              if (damageCalc[x]) {
                damageCalc[x] *= asdf[x];
              } else {
                damageCalc[x] = asdf[x];
              }
            })
            let asdf2 = Object.fromEntries(r[1].data.damage_relations.half_damage_from.map(x => [x.name, 0.5]));
            Object.keys(asdf2).forEach(x => {
              if (damageCalc[x]) {
                damageCalc[x] *= asdf2[x];
              } else {
                damageCalc[x] = asdf2[x];
              }
            })
            const asdf3 = Object.fromEntries(r[1].data.damage_relations.no_damage_from.map(x => [x.name , 0]));
            Object.keys(asdf3).forEach(x => {
              if (damageCalc[x]) {
                damageCalc[x] *= asdf3[x];
              } else {
                damageCalc[x] = asdf3[x];
              }
            })
          }
          console.log(damageCalc);
          let doubleDamageFrom = [];
          let quadrupleDamageFrom = [];
          let halfDamageFrom = [];
          let oneFourthDamageFrom = [];
          let noDamageFrom = [];
          let normalDamageFrom = [];
          let types = [];
          results[2].data.results.forEach(x => {
            if (x.name != 'unknown' && x.name != 'shadow') {
              types.push(x.name);
            }
          });
          setTypes(types);
          types.forEach(x => {
            if (damageCalc[x] == 2) {
              doubleDamageFrom.push(x);
            } else if (damageCalc[x] == 4) {
              quadrupleDamageFrom.push(x)
            } else if (damageCalc[x] == 0.5) {
              halfDamageFrom.push(x);
            } else if (damageCalc[x] == 0.25) {
              oneFourthDamageFrom.push(x);
            } else if (damageCalc[x] == 0) {
              noDamageFrom.push(x);
            } else {
              normalDamageFrom.push(x);
            }
          });
          setDoubleDamageFrom(doubleDamageFrom);
          setQuadrupleDamageFrom(quadrupleDamageFrom);
          setHalfDamageFrom(halfDamageFrom);
          setOneFourthDamageFrom(oneFourthDamageFrom);
          setNoDamageFrom(noDamageFrom);
          setDamageRelations(damageCalc);
        })
      })
      .catch(error => {
        console.error(error);
      })
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
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokedexId);
  }

  function GetPokemonSpeciesInfo(pokedexId) {
    return axios.get('https://pokeapi.co/api/v2/pokemon-species/' + pokedexId);
  }

  function GetTypes() {
    return axios.get('https://pokeapi.co/api/v2/type/');
  }

  // function gotoPrevPage() {
  //   setCurrentPageUrl(prevPageUrl);
  // }

  // function gotoNextPage() {
  //   setCurrentPageUrl(nextPageUrl);
  // }

  function GetOptions() {
    const superEffectiveDamageFrom = doubleDamageFrom.concat(quadrupleDamageFrom);
    const notEffectiveDamageFrom = halfDamageFrom.concat(oneFourthDamageFrom);
    const superEffectiveType = superEffectiveDamageFrom[Math.floor(Math.random()*superEffectiveDamageFrom.length)];
    const notEffectiveType = notEffectiveDamageFrom[Math.floor(Math.random()*notEffectiveDamageFrom.length)];
    const typesList = types.filter(t => t != superEffectiveType && t != notEffectiveType);

    let otherTypes = [];
    while (otherTypes.length < 2) {
      const randomType = typesList[Math.floor(Math.random()*typesList.length)];
      if (otherTypes.indexOf(randomType) == -1) {
        otherTypes.push(randomType);
      }
    }
    console.log('typessszz', superEffectiveType, notEffectiveType, otherTypes);
  }

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
      <div>
        {JSON.stringify(damageRelations)}
      </div>
      <div>
        {doubleDamageFrom}
      </div>
      <div>
        {quadrupleDamageFrom}
      </div>
      <div>
        {halfDamageFrom}
      </div>
      <div>
        {oneFourthDamageFrom}
      </div>
      <div>
        {noDamageFrom}
      </div>
      <button onClick={GetOptions}>Get Options</button>
    </>
  );
}

export default App;
