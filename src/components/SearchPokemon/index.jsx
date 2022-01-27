import React, { useState, useContext } from "react";
import { Context } from "../../Context";
import './style.css'

export const SearchPokemon = ()=>{
  const [suggestedList, setSuggestedList] = useState([]);
  const {setPokemonDetails} = useContext(Context);

  const searchInputValue = async (e)=>{
    try {
      const searchResponse = await fetch('https://pokeapi.co/api/v2/generation/1');
      const searchResponseJson = await searchResponse.json();
      const filteredResults = searchResponseJson.pokemon_species.filter(pokemon => pokemon.name.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value !== '');
      e.keyCode === 13 && fetchChosenPokemon(e.target.value.toLowerCase(), searchResponseJson.pokemon_species);
      setSuggestedList(e.keyCode === 27 ? [] : filteredResults);
    } catch (error) {
      console.error(`Error on SearchPokemon.jsx fetching https://pokeapi.co/api/v2/generation/1 \nComplete message error: ${error}`);  
    }
  }
  const fetchChosenPokemon = async (pokemonName, pokemonGenerationList)=>{
    try {
      if (pokemonGenerationList && !pokemonGenerationList.filter(pokemon => pokemon.name.toLowerCase() === pokemonName).length) {
        setPokemonDetails({empty: true})
      }else{
        const chosenPokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const chosenPokemonResponseJson = await chosenPokemonResponse.json();
        setPokemonDetails(chosenPokemonResponseJson);
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
      <section className='searchPokemon'>
        <input onKeyUp={(e)=>{searchInputValue(e)}} placeholder='Search pokemon'/>
        <ul className={`suggestedList ${suggestedList.length ? 'show':null}`}>
          {suggestedList.length ? suggestedList.map(element => <li tabIndex='0' key={element.name} onClick={(e)=>{fetchChosenPokemon(e.target.innerText)}}>{element.name}</li>):null}
        </ul>
      </section>
  )
}