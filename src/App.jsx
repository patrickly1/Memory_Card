import { useState, useEffect } from 'react'
import Card from './Card'

function App() {
  const pokemonCards = [
    { pic: "1", title: "1"},
    { pic: "2", title: "2"},
    { pic: "3", title: "3"},
    { pic: "4", title: "4"},
    { pic: "5", title: "5"},
    { pic: "6", title: "6"},
    { pic: "7", title: "7"},
    { pic: "8", title: "8"},
    { pic: "9", title: "9"},
    { pic: "10", title: "10"},
    { pic: "11", title: "11"},
    { pic: "12", title: "12"},
    { pic: "13", title: "13"},
    { pic: "14", title: "14"},
    { pic: "15", title: "15"},
    { pic: "16", title: "16"},
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
      //Reset the counter and seen cards
      setDuplicatePokemonCard(true);
      setShuffleTrigger(0);
      setSeenPokemonCards(new Set());
    } else{
      setDuplicatePokemonCard(false);
      const newSet = new Set(seenPokemonCards);
      newSet.add(card.title);
      setSeenPokemonCards(newSet);
      setShuffleTrigger(prev => prev + 1);
      if (maxHighScore === shuffleTrigger) {
        setMaxHighScore(prev => prev + 1);
      }
    }
  };

  return (
    <div className="container">
      <div className="topContainer">
        <h2>
        Memory Card Game  
        </h2>
        <div className="clickCounter">Times Clicked {shuffleTrigger}</div>
        <div className="maxClickCounter">Max counter {maxHighScore}</div>
        <div className="duplicateAlert">{duplicatePokemonCard && "Duplicate card clicked!"}</div>
      </div>
      <div className="bottomContainer">
        {shuffledPokemonCards.map((pokemonCard, index) => (
          <Card
            key={index}
            pic={pokemonCard.pic}
            title={pokemonCard.title}
            index={index}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  )
}

 
export default App
