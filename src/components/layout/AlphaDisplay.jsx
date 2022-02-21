import GameTile from "./GameTile";

function AlphaDisplay({ alpha, handleTap, userGuess }) {
  let hiddenIndexList = [];
  let alphaCopy = alpha;

  for (let i = 0; i < userGuess.length; i++) {
    let idx = alphaCopy.indexOf(userGuess[i]);
    if (idx >= 0 && userGuess[i] !== "") {
      hiddenIndexList.push(idx);
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
