import GameTile from "./GameTile";

function TileDisplay({ size, word, solved }) {
  const fullWord = word + new Array(size - word.length).fill(" ").join("");
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {fullWord.split("").map((value, index) => (
          <GameTile key={index} value={value} index={index} solved={solved} />
        ))}
      </div>
    </div>
  );
}

export default TileDisplay;
