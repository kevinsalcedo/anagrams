function GameTile({
  value,
  index,
  solved = false,
  readOnly = false,
  handleTap,
}) {
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
  if (!solved && !readOnly) {
    styles += " tile-noclick";
  }

  return (
    <button
      key={index}
      className={`d-flex border letter-tile ${styles} align-items-center justify-content-center align-items-center`}
      onClick={() => {
        if (readOnly && !solved) {
          handleTap(value);
        }
      }}
    >
      <p className={!solved ? "h3" : "h1"}>{value}</p>
    </button>
  );
}

export default GameTile;
