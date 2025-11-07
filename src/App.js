import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import deck from "./cards.json";
import "./App.css";
import Endgame from "./components/Endgame";
import Startscreen from "./components/Startscreen";

function App() {
  const shuffleCards = (array, pairs) => {
    const shuffled = [...array.slice(0, pairs * 2)];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [cards, setCards] = useState(() => shuffleCards(deck));
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [victory, setVictory] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(3);
  const [playerName, setPlayerName] = useState("");
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(new Date());

  /* console.log(victory); */

  useEffect(() => {
    console.log(cards.length, cards);
    const allMatched = cards.every((card) => card.isMatched);
    if (cards.length > 0 && allMatched) {
      console.log("is true??");
      setVictory(true);
    }
    /*if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }*/
  }, [cards]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setIsDisabled(true);
      setMoves(moves + 1);

      if (choiceOne.pairId === choiceTwo.pairId) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.pairId === choiceOne.pairId) {
              return { ...card, isMatched: true, isFlipped: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.id === choiceOne.id || card.id === choiceTwo.id) {
                return { ...card, isFlipped: false };
              }
              return card;
            });
          });
          resetTurn();
        }, 2000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsDisabled(false);
  };

  const handleChoice = (cardClicked) => {
    if (
      isDisabled ||
      cardClicked.isMatched ||
      (choiceOne && choiceOne.id === cardClicked.id)
    ) {
      return;
    }

    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === cardClicked.id) {
          return { ...card, isFlipped: true };
        }
        return card;
      });
    });
    choiceOne ? setChoiceTwo(cardClicked) : setChoiceOne(cardClicked);
  };

  const handleNewGame = () => {
    console.log(victory, "avant");
    setCards(shuffleCards(deck, gameDifficulty));
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsDisabled(false);
    setVictory(false);
    setMoves(0);
    setStartTime(new Date());
    setGameStatus(true);
    console.log(victory, "apres");
  };

  const handlePlayerName = (input) => {
    setPlayerName(input.target.value);
  };

  const handleDifficulty = (event) => {
    console.log("diff", event);
    setGameDifficulty(event.target.value);
  };

  const startGame = () => {
    setGameStatus(false);
  };

  return (
    <div className="App">
      <div className="background">
        {gameStatus === false ? (
          <Startscreen
            handleNewGame={handleNewGame}
            handlePlayerName={handlePlayerName}
            handleDifficulty={handleDifficulty}
          />
        ) : victory === true ? (
          <Endgame
            startGame={startGame}
            playerName={playerName}
            moves={moves}
            time={startTime}
          />
        ) : (
          <section className="card-grid">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                handleChoice={handleChoice}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
