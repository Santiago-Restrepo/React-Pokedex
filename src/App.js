import React, {useState, useEffect} from 'react';
import {PokemonCard} from './components/PokemonCard'
import './App.css';

export const App = ()=> {

  const [pokemonList, setPokemonList] = useState({
    offset: -10,
    limitPerPage: 10,
    list: []
  });

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
          // setPokemonList({
          //   offset: pokemonList.offset + step,
          //   limitPerPage: 10,
          //   list: jsonValues
          // });
          return { offset: pokemonList.offset + step, limitPerPage: 10, list: jsonValues}
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() =>{fetchPokemonList('next')}, []);

  return (
    <div className="App">
      <main>
        <input placeholder='Search Pokemon' type='text'/>
        <section className=''>
          <ul className='pokemonList'>
          {
            pokemonList.list.length != 0 ? pokemonList.list.map(pokemon => <PokemonCard key={pokemon.name} pokemonDetails={pokemon}/>)
            : null
          }
          </ul>
        </section>
        <section className='buttons'>
          <button onClick={()=>{fetchPokemonList({direction: 'prev'})}} disabled={pokemonList.offset === 0}>prev</button>
          <button onClick={()=>{fetchPokemonList({direction: 'next'})}}>next</button>
        </section>
      </main>
    </div>
  );
}
