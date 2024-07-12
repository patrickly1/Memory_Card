import React from "react";
import { useState, useEffect } from 'react';

export default function PokemonImage({ pokemonName }) {
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPokemonImage = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();
                const imageUrl = data.sprites.front_shiny;
                setImageUrl(imageUrl);
            } catch (error) {
                setError("Failed to fetch image");
                console.log(error);
            }
        };
        
        fetchPokemonImage();
    }, [pokemonName]);

    return (
        <div>
            {error && <div>{error}</div>}
            {imageUrl && <img src={imageUrl} alt={pokemonName}/>}
            {pokemonName}
        </div>
    )
}