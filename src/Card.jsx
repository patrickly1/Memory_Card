import React from 'react';
import PokemonImage from "./PokemonImage";

export default function Card({
    index,
    handleCardClick,
    pokemonName
}) {
    return (
        <div className="cardContainer">
            <button onClick={() => handleCardClick(index)}>
                <PokemonImage
                    pokemonName={pokemonName}
                />
            </button>
        </div>
    )
}