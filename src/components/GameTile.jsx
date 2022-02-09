function GameTile({ value, index, solved }) {
  return (
    <span
      key={index}
      className={`d-flex border letter-tile ${
        value !== " " ? "letter-tile-filled " : ""
      } align-items-center justify-content-center align-items-center ${
        solved ? "bg-success bg-opacity-75 text-light" : ""
      }`}
    >
      <p className={!solved ? "h3" : "h1"}>{value}</p>
    </span>
  );
}

export default GameTile;
