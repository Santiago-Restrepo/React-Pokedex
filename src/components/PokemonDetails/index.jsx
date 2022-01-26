import React, {useContext} from "react";
import { Context } from "../../Context";
import './style.css';

export const PokemonDetails = ({pokemon})=>{
    const {pokemonDetails, setPokemonDetails} = useContext(Context);
    const closeDetails = (e)=>{
        e.target.parentElement.classList.remove('slideOn');
        setPokemonDetails(null);
    }
    return (
        <>
            <button className="closeButton" onClick={(event)=>{closeDetails(event)}}>X</button>
            {!pokemonDetails.empty ?
                <>
                    <img src={pokemon.sprites.other['official-artwork'].front_default} alt={`Imagen del pokemon ${pokemon.name}`}></img>
                    <h4>{`#${pokemon.id}`}</h4>
                    <h2>{pokemon.name}</h2>
                    <ul>
                        {pokemon.types.map(type => <li key={type.type.name} className={type.type.name}>{type.type.name}</li>)}
                    </ul>
                    <h3>{`Height: ${parseInt(pokemon.height) / 10} m`}</h3>
                    <h3>{`Weight: ${pokemon.weight} kg`}</h3>
                </>
            :
            <>
                <h2>Not founded</h2>
            </>
            }
        </>
    )
}