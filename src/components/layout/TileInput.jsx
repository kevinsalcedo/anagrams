import GameTile from "./GameTile";

function TileInput({
  solved,
  readOnly,
  fillLetters,
  fillIndices,
  hints,
  answer,
  userGuess,
  className,
  game
}) {
  return (
    <div className='row mx-0 mt-2 mb-2 px-0 justify-content-center'>
      {userGuess.map((value, index) => {
        const isGiven = fillLetters && fillIndices && fillIndices.includes(index);
        const isHint = hints.includes(index);

        let letter = value;
        if (isGiven) {
          const f = fillIndices.findIndex(x => index === x);
          letter = fillLetters[f];
        }
        if (isHint) {
          letter = answer.split("")[index];
        }

        return (
          <GameTile
            className={className}
            key={index}
            value={letter}
            index={index}
            solved={solved || isHint}
            immutable={!readOnly && !solved && isGiven}
            game={game}
          />
        );
      })}
    </div>
  );
}

export default TileInput;
