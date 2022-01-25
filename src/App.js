import React, {useState, useEffect} from 'react';
import {PokemonCard} from './components/PokemonCard'
import {PokemonDetails} from './components/PokemonDetails'
import { Context } from './Context';
import './App.css';

export const App = ()=> {

  const [pokemonList, setPokemonList] = useState({
    list : [],
    prev: null,
    next: null,
    offset: 0,
  });

  const [pokemonDetails, setPokemonDetails] = useState(null);

  const LIMITPOKEMONGENERATION = 151;

  const fetchPokemonList = async (url) => {
    try {
      let pokemonListResponse = await fetch(url);
      let pokemonListJson = await pokemonListResponse.json();
      let pokemonPromises = pokemonListJson.results.map(pokemon => fetch(pokemon.url));
      let newOffset = (new URL(url)).searchParams.get('offset');
      
      Promise.all(pokemonPromises).then(values => {
        let valuesPromises = values.map((response) => response.json());
        Promise.all(valuesPromises).then(jsonValues =>{
          setPokemonList({
            list: jsonValues.filter(pokemon => pokemon.id <= LIMITPOKEMONGENERATION),
            prev: pokemonListJson.previous,
            next: pokemonListJson.next,
            offset: newOffset
          });
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() =>{
    fetchPokemonList('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10')
  }, []);

  return (
    <Context.Provider value={{setPokemonDetails}}>
      <div className="App">
        <h1>First Pokemon Generation</h1>
        <main className={pokemonDetails != null ? 'slideOn' : null}>
          <section className='pokemonList'>
            <ul >
            {
              pokemonList.list.length ? pokemonList.list.map(pokemon => <PokemonCard key={pokemon.name} pokemonInfo={pokemon} set/>)
              : null
            }
            </ul>
            <div className='buttons'>
              <button onClick={()=>{fetchPokemonList(pokemonList.prev)}} disabled={pokemonList.prev === null}>prev</button>
              <button onClick={()=>{fetchPokemonList(pokemonList.next)}} disabled={pokemonList.offset > LIMITPOKEMONGENERATION - 10} >next</button>
            </div>
          </section>
          <section className={pokemonDetails != null ? 'pokemonDetails slideOn': 'pokemonDetails'}>
            {
              pokemonDetails ? <PokemonDetails pokemon={pokemonDetails}/>
              :null
            }
          </section>
        </main>
      </div>
    </Context.Provider>
  );
}
