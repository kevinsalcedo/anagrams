import GameTile from "./GameTile";

function TileInput({
  size = 7,
  word,
  solved,
  readOnly,
  fillLetter,
  fillIndex,
  hints,
  answer,
}) {
  const fullWord = word + new Array(size - word.length).fill(" ").join("");
  return (
    <div className='row mx-0 mt-2 mb-2 px-0 justify-content-center'>
      {fullWord.split("").map((value, index) => {
        const isGiven =
          fillLetter !== null && fillIndex >= 0 && fillIndex === index;
        const isHint = hints.includes(index);

        let letter = value;
        if (isGiven) {
          letter = fillLetter;
        }
        if (isHint) {
          letter = answer.split("")[index];
        }

        return (
          <GameTile
            key={index}
            value={letter}
            index={index}
            solved={solved || isHint}
            immutable={!readOnly && !solved && isGiven}
          />
        );
      })}
    </div>
  );
}

export default TileInput;
