import React from "react";
import pokeballImage from '../../assets/pokeball.png'
import './style.css'

export const PokemonCard = ({pokemonDetails})=>{

    return (
        <li className="pokemonCard">
            <div className="pokemonCard__id">
                <img alt='Imagen de Pokeball' src={pokeballImage}/>
                <span>{`No. ${pokemonDetails.id}`}</span>
            </div>
            <div className="pokemonCard__image">
                <img src={pokemonDetails.sprites.front_default} alt={`Imagen del pokemon ${pokemonDetails.name}`}/>
            </div>
        </li>
    )
}