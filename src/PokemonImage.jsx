import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function PokemonImage(pokemonName) {
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPokemonImage = async () => {
            try {
                const response = await axios.get(`https:/pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const imageUrl = response.data.sprites.front_shiny;
                setImageUrl(imageUrl);
            } catch (error) {
                setError("Failed to fetch image");
                console.log(error);
            }
        };
        
        fetchPokemonImage();
    }, []);

    return (
        <div>
            
        </div>
    )
}