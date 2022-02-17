import GameTile from "./GameTile";

function TileDisplay({
  size,
  word,
  solved,
  readOnly,
  handleTap,
  fillLetter,
  fillIndex,
}) {
  const fullWord = word + new Array(size - word.length).fill(" ").join("");
  return (
    <div className='row mx-0 mt-2 mb-2 px-0 justify-content-center'>
      {fullWord.split("").map((value, index) => (
        <GameTile
          key={index}
          value={
            !readOnly &&
            !solved &&
            fillLetter &&
            fillIndex &&
            fillIndex === index
              ? fillLetter
              : value
          }
          index={index}
          solved={solved}
          readOnly={readOnly}
          handleTap={handleTap}
          immutable={
            !readOnly &&
            !solved &&
            fillLetter &&
            fillIndex &&
            fillIndex === index
          }
        />
      ))}
    </div>
  );
}

export default TileDisplay;
