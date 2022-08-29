import GameTile from "./GameTile";
import Row from 'react-bootstrap/Row';

function AlphaDisplay({ alpha, handleTap, userGuess, fillIndices, game}) {
  let hiddenIndexList = [];
  let alphaCopy = alpha;

  // Iterate over user guess to mark alphagram tiles to hide
  for (let i = 0; i < userGuess.length; i++) {
    let idx = alphaCopy.indexOf(userGuess[i]);
    // Ignore the given letter if provided
    if (userGuess[i] !== "") {
      // If fillIndices are provided (8s or 9s puzzle), check to make sure we're not filling it in
      if (fillIndices && fillIndices.includes(i)) {
        continue;
      }
      // If a wildcard is present, typing a letter NOT in the alphagram will fill in the ? tile
      if(idx < 0) {
        if(alphaCopy.includes("?")) {
          idx = alphaCopy.indexOf("?");
        } else {
          continue;
        }
      }
      hiddenIndexList.push(idx);
      // Replace the position in the alphagram with * so we can preserve index order
      let s = alphaCopy.split("");
      s[idx] = "*";
      alphaCopy = s.join("");
    } 
  }

  return (
    <Row className='mx-0 my-2 px-0 justify-content-center'>
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
            game={game}
          />
        );
      })}
    </Row>
  );
}

export default AlphaDisplay;
