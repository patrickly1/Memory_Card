import React from 'react';
import PokemonImage from "./PokemonImage";

export default function Card({ pic, 
    title ,
    index,
    handleCardClick,
    pokemonName
}) {
    return (
        <div className="cardContainer">
            <button onClick={() => handleCardClick(index)}>
                <div className="buttonPic">
                    {pic}
                </div>
                <div className="buttonTitle">
                    {title}
                </div>
                <PokemonImage
                    pokemonName={pokemonName}
                />
            </button>
        </div>
    )
}