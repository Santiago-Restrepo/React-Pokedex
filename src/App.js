import React, {useState, useEffect} from 'react';
import {PokemonCard} from './components/PokemonCard'
import {PokemonDetails} from './components/PokemonDetails'
import { Context } from './Context';
import './App.css';

export const App = ()=> {

  const [pokemonList, setPokemonList] = useState({
    offset: -10,
    limitPerPage: 10,
    list: []
  });

  const [pokemonDetails, setPokemonDetails] = useState(null);

  const fetchPokemonList = async ({direction}) => {
    let step;
    direction === 'prev' ? step = -10 : step = 10;
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${pokemonList.offset + step}&limit=${pokemonList.limitPerPage}`;
    try {
      let pokemonListResponse = await fetch(url);
      let pokemonListJson = await pokemonListResponse.json();
      let pokemonPromises = pokemonListJson.results.map(pokemon => fetch(pokemon.url));        
      
      Promise.all(pokemonPromises).then(values => {
        let valuesPromises = values.map(async (response) => await response.json());
        Promise.all(valuesPromises).then(jsonValues =>{
          setPokemonList({
            offset: pokemonList.offset + step,
            limitPerPage: 10,
            list: jsonValues
          });
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() =>{fetchPokemonList('next')}, []);

  return (
    <Context.Provider value={{setPokemonDetails}}>
      <div className="App">
        <main>
          <input placeholder='Search Pokemon' type='text'/>
          <section className='pokemonList'>
            <ul >
            {
              pokemonList.list.length != 0 ? pokemonList.list.map(pokemon => <PokemonCard key={pokemon.name} pokemonInfo={pokemon} set/>)
              : null
            }
            </ul>
            <div className='buttons'>
              <button onClick={()=>{fetchPokemonList({direction: 'prev'})}} disabled={pokemonList.offset === 0}>prev</button>
              <button onClick={()=>{fetchPokemonList({direction: 'next'})}}>next</button>
            </div>
          </section>
          <section className='pokemonDetails'>
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
