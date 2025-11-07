import "./style.css";

function Startscreen(props) {
  return (
    <div className="startscreen">
      <label for="playerName">Votre pseudo:</label>
      <input
        type="text"
        id="playerName"
        onChange={props.handlePlayerName}
        placeholder="Pseudo..."
      ></input>
      <label for="gameDifficulty">Nombre de pairs: </label>
      <select id="gameDifficulty" onChange={props.handleDifficulty}>
        <option value="3">3 Pairs</option>
        <option value="4">4 Pairs</option>
        <option value="5">5 Pairs</option>
        <option value="6">6 Pairs</option>
        <option value="7">7 Pairs</option>
        <option value="8">8 Pairs</option>
        <option value="9">9 Pairs</option>
        <option value="10">10 Pairs</option>
        <option value="11">11 Pairs</option>
        <option value="12">12 Pairs</option>
      </select>
      <button onClick={props.handleNewGame}>Start Game</button>
    </div>
  );
}

export default Startscreen;
