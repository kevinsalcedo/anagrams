function GameTile({ value, index, solved = false, readOnly = false }) {
  let styles = "";
  if (value !== " " && !solved) {
    styles += " letter-tile-filled";
  }
  if (solved && !readOnly) {
    styles += " bg-success bg-opacity-75 text-light";
  }
  if (readOnly) {
    styles += " letter-tile-display";
  }
  return (
    <span
      key={index}
      className={`d-flex border letter-tile ${styles} align-items-center justify-content-center align-items-center`}
    >
      <p className={!solved ? "h3" : "h1"}>{value}</p>
    </span>
  );
}

export default GameTile;
