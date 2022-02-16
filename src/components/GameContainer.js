import { useEffect, useState } from "react";
import {
  getWord,
  isWordCompleted,
  markWordCompleted,
} from "../utils/wordUtils";
import {
  GUESS_SUCCESS,
  GUESS_INCOMPLETE,
  GUESS_INCORRECT,
  GUESS_INVALID,
  ARCHIVE_NEXT,
} from "../assets/alertMessages";
import { getGameSettings } from "../utils/settingsUtils";
import PageTitle from "./layout/PageTitle";
import SoftKeyboard from "./SoftKeyboard";
import TileDisplay from "./layout/TileDisplay";

function GameContainer({ toggleToast, title, game, isArchive = false }) {
  // Game state
  const [answer, setAnswer] = useState(null);
  const [solved, setSolved] = useState(false);
  const [guessString, setGuessString] = useState("");
  // Conditional to clear entire word on incorrect guess
  const [clearWord, setClearWord] = useState(false);
  const [gameSettings, setGameSettings] = useState(null);

  // Load in the word of the day
  useEffect(() => {
    initWord();
  }, [game, isArchive, title]);

  function initWord() {
    // Initialize game settings
    const gameSettings = getGameSettings(game);
    setGameSettings((prev) => gameSettings);

    // Initialize game state
    const word = getWord(game, isArchive);
    if (word) {
      const completed = isWordCompleted(game, word.index);
      setAnswer((prev) => word);
      setSolved((prev) => completed);
      setGuessString((prev) => (completed ? word.word : ""));
    }
  }

  // First render, before answer is retrieved
  if (!answer) {
    return <div>Loading..</div>;
  }

  // Handler for submitting a guess with the Enter key
  function handleSubmit() {
    const guess = guessString;
    // Use has not filled in entire guess
    if (guessString.length !== answer.word.length) {
      toggleToast(true, GUESS_INCOMPLETE, "warning");
      return;
    }

    // Correct answer
    if (guess === answer.word) {
      setSolved(true);
      markWordCompleted(game, answer.index);

      toggleToast(true, isArchive ? ARCHIVE_NEXT : GUESS_SUCCESS, "success");
      // If in archive mode, then let the user clear the word on next input
      setClearWord(isArchive);
      return;
    }

    // Incorrect characters used
    if (
      guess.split("").sort().join("") !== answer.word.split("").sort().join("")
    ) {
      toggleToast(true, GUESS_INVALID, "danger");
      setClearWord(true);

      return;
    }

    // Incorrect guess
    toggleToast(true, GUESS_INCORRECT, "danger");
    setClearWord(true);
  }

  // Set the guess based on physical and virtual keyboard input
  function handleInput(character) {
    if (solved && !isArchive) {
      return;
    }
    toggleToast(false);

    const pattern = /^[a-zA-Z]$/;
    if (character === "{backspace}") {
      setGuessString((prev) => {
        if (prev.length > 0 && !clearWord) {
          // [Eights Mode] Ignore the given character
          if (
            game.includes("eight") &&
            prev.length === answer.letterIndex + 1
          ) {
            return prev.substring(0, prev.length - 2);
          }
          return prev.substring(0, prev.length - 1);
        }
        return "";
      });
      setClearWord(false);
    }
    if (character === "{enter}") {
      if (solved || clearWord) {
        // We only get here if isArchive is true
        initWord();
        setClearWord(false);
      } else {
        handleSubmit();
      }
    }
    if (pattern.test(character)) {
      setGuessString((prev) => {
        if (prev.length < answer.word.length) {
          // [Eights Mode] If a different character, append. If same, act as if you added it
          if (game.includes("eight") && prev.length === answer.letterIndex) {
            if (character.toUpperCase() !== answer.letter) {
              return prev + answer.letter + character.toUpperCase();
            }
          }
          return prev + character.toUpperCase();
        }
        if (clearWord) {
          setClearWord(false);
          return character.toUpperCase();
        }
        return prev;
      });
    }
  }

  return (
    <>
      <div id='contentRow' className='row justify-content-center mt-auto mb-2'>
        <PageTitle
          title={title}
          subtitle={game}
          date={isArchive ? answer.index : null}
        />
        <div
          id='tilesRow'
          className='row px-0 mb-auto gy-2 justify-content-center'
        >
          <TileDisplay
            size={gameSettings.WORD_SIZE}
            word={answer.word.split("").sort().join("")}
            readOnly
            handleTap={handleInput}
          />
          <TileDisplay
            size={gameSettings.WORD_SIZE}
            word={guessString}
            solved={solved}
            fillLetter={game.includes("eight") ? answer.letter : null}
            fillIndex={game.includes("eight") ? answer.letterIndex : null}
          />
          {isArchive && solved && (
            <button
              className={`btn ${
                solved ? "bg-success bg-opacity-75" : "btn-secondary"
              }`}
              onClick={() => initWord()}
              style={{ width: "5rem" }}
            >
              {solved ? "Next" : "Skip"}
            </button>
          )}
        </div>
      </div>
      <SoftKeyboard
        name={game}
        handleInput={handleInput}
        disabled={solved && !isArchive}
      />
    </>
  );
}

export default GameContainer;
