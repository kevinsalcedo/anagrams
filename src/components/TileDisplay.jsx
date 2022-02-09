import GameTile from "./GameTile";

function TileDisplay({ size, word, solved, readOnly }) {
  const fullWord = word + new Array(size - word.length).fill(" ").join("");
  return (
    <div className='row mx-0 px-0 justify-content-center'>
      {fullWord.split("").map((value, index) => (
        <GameTile
          key={index}
          value={value}
          index={index}
          solved={solved}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}

export default TileDisplay;
