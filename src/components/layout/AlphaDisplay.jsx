import GameTile from "./GameTile";

function AlphaDisplay({ alpha, handleTap, userGuess, fillIndex }) {
  let hiddenIndexList = [];
  let alphaCopy = alpha;

  // Iterate over user guess to mark alphagram tiles to hide
  for (let i = 0; i < userGuess.length; i++) {
    let idx = alphaCopy.indexOf(userGuess[i]);
    // Ignore the given letter if provided
    if (idx >= 0 && userGuess[i] !== "" && fillIndex && i !== fillIndex) {
      hiddenIndexList.push(idx);
      // Replace the position in the alphagram with * so we can preserve index order
      let s = alphaCopy.split("");
      s[idx] = "*";
      alphaCopy = s.join("");
    }
  }

  return (
    <div className='row mx-0 my-2 px-0 justify-content-center'>
      {alpha.split("").map((value, index) => {
        let styles = "";
        if (hiddenIndexList.includes(index)) {
          styles = "tile-hidden";
        }
        return (
          <GameTile
            className={styles}
            key={index}
            value={value}
            index={index}
            handleTap={handleTap}
            readOnly
            disabled={hiddenIndexList.includes(index)}
          />
        );
      })}
    </div>
  );
}

export default AlphaDisplay;
