import "./style.css";

function Endgame({ startGame, playerName, moves, time }) {
  return (
    <div className="endscreen">
      <h2>Bravo {playerName} !! </h2>
      <p>
        Tu as fini le jeu en <span className="bold">{moves}</span> actions et{" "}
        <span className="bold">
          {Math.floor((new Date().valueOf() - time.valueOf()) / 1000)}
        </span>{" "}
        secondes.
      </p>
      <button className="restart" onClick={startGame}>
        Nouvelle partie
      </button>
    </div>
  );
}

export default Endgame;
