import React, {useContext} from "react";
import pokeballImage from '../../assets/pokeball.png'
import './style.css'
import { Context } from "../../Context";

export const PokemonCard = ({pokemonInfo})=>{
    const {setPokemonDetails} = useContext(Context);
    return (
        <li className="pokemonCard" onClick={()=>{setPokemonDetails(pokemonInfo)}}>
            <div className="pokemonCard__id">
                <img alt='Imagen de Pokeball' src={pokeballImage} className="pokeballImage"/>
                <span>{`No. ${pokemonInfo.id}`}</span>
            </div>
            <div className="pokemonCard__image">
                <img src={pokemonInfo.sprites.front_default} alt={`Imagen del pokemon ${pokemonInfo.name}`}/>
            </div>
        </li>
    )
}