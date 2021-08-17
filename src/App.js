import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import SpriteDisplay from './SpriteDisplay';
import axios from 'axios';
import PokemonTypes from './PokemonTypes';
import Button from 'react-bootstrap/Button';
import Text from 'react-bootstrap/FormText';

const nullPokemon = {
  sprites: { front_default: undefined }
}

function App() {
  const [pokemon, setPokemon] = useState(nullPokemon);
  const [listPokemon, setListPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [spriteUrl, setSpriteUrl] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokedexId, setPokedexId] = useState(0);
  const [generation, setGeneration] = useState('');
  const [currentRandomPokedexId, setCurrentRandomPokedexId] = useState();
  const [damageRelations, setDamageRelations] = useState([]);
  const [doubleDamageFrom, setDoubleDamageFrom] = useState([]);
  const [quadrupleDamageFrom, setQuadrupleDamageFrom] = useState([]);
  const [halfDamageFrom, setHalfDamageFrom] = useState([]);
  const [oneFourthDamageFrom, setOneFourthDamageFrom] = useState([]);
  const [noDamageFrom, setNoDamageFrom] = useState([]);
  const [types, setTypes] = useState([]);
  const [options, setOptions] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(false);
  const [userAnswered, setUserAnswered] = useState(undefined);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    newRandomPokemon();
  }, []);

  function newRandomPokemon() {
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
          .then(typeRelation => {
            setLoading(false);
            let damageCalc = Object.fromEntries(typeRelation[0].data.damage_relations.double_damage_from.map(x => [x.name, 2]));
            const halfDamage = Object.fromEntries(typeRelation[0].data.damage_relations.half_damage_from.map(x => [x.name, 0.5]));
            Object.keys(halfDamage).forEach(x => {
              damageCalc[x] = 0.5;
            });
            const noDamage = Object.fromEntries(typeRelation[0].data.damage_relations.no_damage_from.map(x => [x.name, 0]));
            Object.keys(noDamage).forEach(x => {
              damageCalc[x] = noDamage[x];
            });
            if (typeRelation[1]) {
              const secondTypeDoubleDamageFrom = Object.fromEntries(typeRelation[1].data.damage_relations.double_damage_from.map(x => [x.name, 2]));
              Object.keys(secondTypeDoubleDamageFrom).forEach(x => {
                if (damageCalc[x]) {
                  damageCalc[x] *= secondTypeDoubleDamageFrom[x];
                } else {
                  damageCalc[x] = secondTypeDoubleDamageFrom[x];
                }
              })
              const secondTypeHalfDamageFrom = Object.fromEntries(typeRelation[1].data.damage_relations.half_damage_from.map(x => [x.name, 0.5]));
              Object.keys(secondTypeHalfDamageFrom).forEach(x => {
                if (damageCalc[x]) {
                  damageCalc[x] *= secondTypeHalfDamageFrom[x];
                } else {
                  damageCalc[x] = secondTypeHalfDamageFrom[x];
                }
              })
              const secondTypeNoDamageFrom = Object.fromEntries(typeRelation[1].data.damage_relations.no_damage_from.map(x => [x.name, 0]));
              Object.keys(secondTypeNoDamageFrom).forEach(x => {
                if (damageCalc[x]) {
                  damageCalc[x] *= secondTypeNoDamageFrom[x];
                } else {
                  damageCalc[x] = secondTypeNoDamageFrom[x];
                }
              })
            }
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
            GetOptions(doubleDamageFrom, quadrupleDamageFrom, halfDamageFrom, oneFourthDamageFrom, noDamageFrom, types);
          })
      })
      .catch(error => {
        console.error(error);
      })
  }

  function GetPokemonInfo(pokedexId) {
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokedexId);
  }

  function GetPokemonSpeciesInfo(pokedexId) {
    return axios.get('https://pokeapi.co/api/v2/pokemon-species/' + pokedexId);
  }

  function GetTypes() {
    return axios.get('https://pokeapi.co/api/v2/type/');
  }

  function GetOptions(doubleDamageFrom, quadrupleDamageFrom, halfDamageFrom, oneFourthDamageFrom, noDamageFrom, types) {
    const superEffectiveDamageFrom = doubleDamageFrom.concat(quadrupleDamageFrom);
    const notEffectiveDamageFrom = halfDamageFrom.concat(oneFourthDamageFrom).concat(noDamageFrom);
    const superEffectiveType = superEffectiveDamageFrom[Math.floor(Math.random() * superEffectiveDamageFrom.length)];
    const notEffectiveType = notEffectiveDamageFrom[Math.floor(Math.random() * notEffectiveDamageFrom.length)];
    const typesList = types.filter(t => t != superEffectiveType && t != notEffectiveType);

    let otherTypes = [];
    while (otherTypes.length < 2) {
      const randomType = typesList[Math.floor(Math.random() * typesList.length)];
      if (otherTypes.indexOf(randomType) == -1) {
        otherTypes.push(randomType);
      }
    }
    let options = [superEffectiveType].concat([notEffectiveType]).concat(otherTypes);

    // Randomize Options Array
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = options[i];
      options[i] = options[j];
      options[j] = temp;
    }

    // console.log('typessszz', superEffectiveType, notEffectiveType, otherTypes);
    setOptions(options);
  }

  function checkAnswer(type) {
    let correct = doubleDamageFrom.indexOf(type) != -1 || quadrupleDamageFrom.indexOf(type) != -1;
    if (!userAnswered && correct) {
      setPoints(points + 1);
      if (highScore < points + 1) {
        setHighScore(points + 1);
      }
    }
    setUserAnswered(type);
    setAnswerStatus(correct);
  }

  if (loading) return 'Loading...';

  return (
    <>
      <div>
      High Score: {highScore}
      </div>
      <div>
        {spriteUrl && <SpriteDisplay spriteUrl={spriteUrl} />}
      </div>
      <h1>
        {pokemonName.replace(/\b\w/g, l => l.toUpperCase())}
      </h1>
      {userAnswered && (
        <>
          <h3>
            Pokedex Number #{pokedexId}
          </h3>
          <h4>
            {generation.replace(/\b\w/g, l => l.toUpperCase())}
          </h4>
          <PokemonTypes types={pokemonTypes}></PokemonTypes>
          <div>
            Double Damage From: {doubleDamageFrom.join(', ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <div>
            Quadruple Damage From: {quadrupleDamageFrom.join(', ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <div>
            Half Damage From: {halfDamageFrom.join(', ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <div>
            One Fourth Damage From: {oneFourthDamageFrom.join(', ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <div>
            No Damage From: {noDamageFrom.join(', ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </>
      )}
      {/* <button onClick={GetOptions}>Get Options</button> */}
      {!userAnswered &&
        <h2>
          Select the type that would be effective against this Pokemon! 😎👌
      </h2>
      }
      <div>
        {options.length > 0 && options.map((x, i) => {
          let selected = false;
          if (x == userAnswered) {
            selected = true;
          }
          return (
            <>
              <Button
                variant={selected ? answerStatus ? 'success' : 'danger' : 'primary'}
                key={x}
                onClick={() => checkAnswer(x)}
                disabled={userAnswered}
              >
                {x}
              </Button>
              {i % 2 == 1 && <br />}
            </>
          )
        })}

      </div>
      <h1>
        {userAnswered && answerStatus && "GOOOOOOD JOB 😜"}
        {userAnswered && !answerStatus && "oh noo... 😔"}
      </h1>
      <div>
        {userAnswered && (
          <Button onClick={() => {
            if (!answerStatus) {
              setPoints(0);
            }
            setUserAnswered(undefined);
            newRandomPokemon();
          }
          }>{answerStatus ? 'Anotha\' one' : 'Try Again?'}</Button>
        )}
      </div>
      <div>
        Points: {points}
      </div>
    </>
  );
}

export default App;
