import { useState, useEffect } from 'react';
import Card from './Card';
import "./index.css";

function App() {
  //Pool of 16 pokemocards that we will later select from to populate the cards
  const pokemonCards = [
    {title: "articuno"},
    {title: "zapdos"},
    {title: "moltres"},
    {title: "mewtwo"},
    {title: "mew"},
    {title: "raikou"},
    {title: "entei"},
    {title: "suicune"},
    {title: "lugia"},
    {title: "ho-oh"},
    {title: "celebi"},
    {title: "kyogre"},
    {title: "groudon"},
    {title: "rayquaza"},
    {title: "latias"},
    {title: "latios"},
  ]

  const [shuffledPokemonCards, setShuffledPokemonCards] = useState([]);
  const [shuffleTrigger, setShuffleTrigger] = useState(0);
  const [seenPokemonCards, setSeenPokemonCards] = useState(new Set());
  const [duplicatePokemonCard, setDuplicatePokemonCard] = useState(false);
  const [maxHighScore, setMaxHighScore] = useState(0);



  useEffect(() => {
    //shuffle the array of pokemon cards
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledPokemonCards = shuffleArray([...pokemonCards]).slice(0, 12);
    setShuffledPokemonCards(shuffledPokemonCards);
  }, [shuffleTrigger]); // dependency on shuffleTrigger

  // handle card click
  const handleCardClick = (index) => {
    // Pass the index of the card clicked to find the card in shuffledPokemonCards
    const card = shuffledPokemonCards[index];
    // Check if card has been clicked before
    if (seenPokemonCards.has(card.title)) {
      //Alert the user that a duplicate card has been clicked
      setDuplicatePokemonCard(true);

      //Reset the counter 
      setShuffleTrigger(0);

      //Reset the Set of seen cards
      setSeenPokemonCards(new Set());
    } else{
      //If the user was previously alerted of a duplicate card has been clicked, reset
      setDuplicatePokemonCard(false);

      //Create a new Set
      const newSet = new Set(seenPokemonCards);

      //Add current clicked card to Set of seen cards
      newSet.add(card.title);

      //Add the newly created Set
      setSeenPokemonCards(newSet);

      //Increase the score counter
      setShuffleTrigger(prev => prev + 1);

      //The max high score will only be increased if it is equal to the current score.
      //There will never be a case where the max high score will be less than
      //the current score. If it is greater than the current score, ignore. 
      if (maxHighScore === shuffleTrigger) {
        setMaxHighScore(prev => prev + 1);
      }
    }
  };

  return (
    <div className="container">
        <div className="topContainer">
        <h2>Pokemon Memory Card Game</h2>
        <div className="scoreContainer">
          <div className="score">
            <div className="scoreTitle">Current Score:</div>
            <div className="scoreNumber">{shuffleTrigger}</div>
          </div>
          <div className="score">
            <div className="scoreTitle">Max Score:</div>
            <div className="scoreNumber">{maxHighScore}</div>
          </div>
        </div>
        <div className="duplicateAlert">
          {duplicatePokemonCard && "You clicked the same card, try again!"}
        </div>
      </div>
      <div className="bottomContainer">
        {shuffledPokemonCards.map((pokemonCard, index) => (
          <Card
            key={index}
            index={index}
            handleCardClick={handleCardClick}
            pokemonName={pokemonCard.title}
          />
        ))}
      </div>
    </div>
  )
}

 
export default App
