import {useEffect, useState} from 'react';
import './App.css'
import SingleCard from './components/singleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", "matched" : false},
  {"src": "/img/potion-1.png", "matched" : false},
  {"src": "/img/ring-1.png", "matched" : false},
  {"src": "/img/scroll-1.png", "matched" : false},
  {"src": "/img/shield-1.png", "matched" : false},
  {"src": "/img/sword-1.png", "matched" : false}
];


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstClick, setFirstClick] = useState(null);
  const [secondClick, setSecondClick] = useState(null);
  const [disabled, setDisabled] = useState(false)


  //shuffle card
  const shuffleCard = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffleCards)
    setFirstClick(null);
    setSecondClick(null);
    setTurns(0)
  }

  const handleChoice = (card) => {
    firstClick ? setSecondClick(card) : setFirstClick(card);
  }

  useEffect( () => {
      if (firstClick && secondClick) {
        setDisabled(true)
        if(firstClick.src === secondClick.src){
          setCards(prevCards => prevCards.map((card) => {
            if(card.src === firstClick.src){
              return { ...card, matched: true}
            } else{
              return card
            }
          }))
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000)
        }
      }
    }, [firstClick, secondClick])

    const resetTurn =() => {
      setFirstClick(null);
      setSecondClick(null);
      setTurns(prevTurns => prevTurns + 1);
      setDisabled(false)
    }

    useEffect( () => {
      shuffleCard();
    }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id}
          card ={card}
          handleChoice={handleChoice}
          flipped = {card === firstClick || card === secondClick || card.matched}
          disabled ={disabled}
          />
       ))}
      </div>
      <div className="turns">Turns:{turns}</div>
    </div>
  );
}

export default App