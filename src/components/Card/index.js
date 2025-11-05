import "./style.css";

function Card(props) {
  return (
    <button
      className={props.isFlipped || props.isMatched ? "card_flipped" : "card"}
      onClick={() => props.handleChoice(props.card)}
    >
      <img
        src={props.card.icon}
        className="frontSide"
        alt={props.card.name}
      ></img>
      <img
        src="Images/card_back_small.jpg"
        className="backSide"
        alt={props.card.name}
      ></img>
    </button>
  );
}

export default Card;
