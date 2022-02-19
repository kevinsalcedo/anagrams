function GameTile({
  value,
  index,
  solved = false,
  readOnly = false,
  handleTap,
  immutable,
}) {
  let styles = "";
  if (value !== " " && !solved) {
    if (!immutable) {
      styles += " letter-tile-filled";
    } else {
      styles += " letter-tile-immutable";
    }
  }
  if (solved && !readOnly) {
    styles += " bg-success bg-opacity-75 text-light";
  }
  if (readOnly) {
    styles += " letter-tile-display";
  }

  return (
    <button
      key={`tile-${index}`}
      id={`tile-${index}`}
      className={`d-flex border letter-tile ${styles} align-items-center justify-content-center align-items-center`}
      onClick={() => {
        if (readOnly && !solved) {
          handleTap(value);
        }
      }}
      onKeyDown={(e) => e.preventDefault()}
    >
      {<p className={`m-0 ${!solved ? "h3" : "h2"}`}>{value}</p>}
    </button>
  );
}

export default GameTile;
