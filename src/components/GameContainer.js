import { useEffect, useState } from "react";
import {
  getDayDiff,
  getWord,
  getWordByIndex,
  isWordCompleted,
  markWordCompleted,
  getLatestIncompleteIndex,
  isValidDate,
  isValidIndex,
} from "../utils/wordUtils";
import {
  GUESS_SUCCESS,
  GUESS_INCOMPLETE,
  GUESS_INCORRECT,
  GUESS_INVALID,
  ARCHIVE_NEXT,
  ARCHIVE_END,
} from "../assets/alertMessages";
import { getGameSettings } from "../utils/settingsUtils";
import PageTitle from "./layout/PageTitle";
import SoftKeyboard from "./SoftKeyboard";
import TileDisplay from "./layout/TileDisplay";
import DateSelector from "./DateSelector";
import SubmitButton from "./SubmitButton";

function GameContainer({ toggleToast, title, game, isArchive = false }) {
  // Game state
  const [gameState, setGameState] = useState({
    answer: null,
    solved: false,
    guessString: "",
    dateIndex: -1,
  });

  const [gameSettings, setGameSettings] = useState(null);
  const { dateIndex, solved, guessString, answer } = gameState;

  // On game change, initialize game settings and game state
  useEffect(() => {
    const gameSettings = getGameSettings(game);
    setGameSettings((prev) => gameSettings);
    // Initialize
    updateGameState(gameState, true);
  }, [game, isArchive]);

  function updateGameState(stateObj, switchGame) {
    const newState = { ...stateObj };
    // Reinitialize game state on date change
    if (switchGame || newState.dateIndex !== gameState.dateIndex) {
      let idx = getLatestIncompleteIndex(game);
      if (switchGame) {
        newState.dateIndex = idx;
      } else {
        idx = newState.dateIndex;
      }

      let word = isArchive ? getWordByIndex(game, idx) : getWord(game, false);
      if (word) {
        const completed = isWordCompleted(game, word.index);
        newState.answer = word;
        newState.solved = completed;
        newState.guessString = completed ? word.word : "";
      }
    }
    setGameState(newState);
  }

  // First render, before answer is retrieved
  if (!gameSettings || !gameState.answer) {
    return <div>Loading..</div>;
  }

  // Handler for submitting a guess with the Enter key
  function handleSubmit() {
    let newState = { ...gameState };

    let msg = GUESS_INCORRECT;
    let type = "danger";

    // Use has not filled in entire guess
    if (guessString.length !== answer.word.length) {
      msg = GUESS_INCOMPLETE;
      type = "warning";
    }

    // Correct answer
    else if (guessString === answer.word) {
      // setSolved(true);
      newState.solved = true;
      markWordCompleted(game, answer.index);
      msg = GUESS_SUCCESS;
      if (isArchive) {
        msg = isValidIndex(dateIndex + 1) ? ARCHIVE_NEXT : ARCHIVE_END;
      }
      type = "success";
    }

    // Incorrect characters used
    else if (
      guessString.split("").sort().join("") !==
      answer.word.split("").sort().join("")
    ) {
      msg = GUESS_INVALID;
    }

    updateGameState(newState);
    toggleToast(true, msg, type);
  }

  // Set the guess based on physical and virtual keyboard input
  function handleInput(character) {
    const newState = { ...gameState };
    let newGuess = "";

    if (solved && !isArchive) {
      return;
    }

    const pattern = /^[a-zA-Z]$/;
    // Character A-Z entered
    if (pattern.test(character)) {
      if (solved) {
        return;
      }
      if (guessString.length < answer.word.length) {
        // [Eights Mode] If a different character, append. If same, act as if you added it

        if (
          game.includes("eight") &&
          guessString.length === answer.letterIndex
        ) {
          console.log(character);
          if (character.toUpperCase() !== answer.letter) {
            newGuess = guessString + answer.letter + character.toUpperCase();
          } else {
            newGuess = guessString + answer.letter;
          }
        } else {
          newGuess = guessString + character.toUpperCase();
        }
        newState.guessString = newGuess;
      }
    }

    // Backspace hit
    if (character === "{backspace}") {
      if (solved) {
        return;
      }
      if (guessString.length > 0) {
        if (
          game.includes("eight") &&
          guessString.length === answer.letterIndex + 1
        ) {
          newGuess = guessString.substring(0, guessString.length - 2);
        } else {
          newGuess = guessString.substring(0, guessString.length - 1);
        }
      }
      newState.guessString = newGuess;
    }

    // Submit the form on enter
    if (character === "{enter}" && !solved) {
      handleSubmit();
    } else {
      // Move to next word - set the date before changing the game state
      if (character === "{enter}" && solved) {
        if (isValidIndex(dateIndex + 1)) {
          newState.dateIndex = dateIndex + 1;
        }
      }
      updateGameState(newState);
    }
  }

  // Setter for the datepicker
  function handleDateChange(date) {
    let dayDiff = getDayDiff(date);
    if (!isValidDate(date)) {
      return;
    }
    updateGameState({ ...gameState, dateIndex: dayDiff });
  }

  return (
    <>
      <div
        id='contentRow'
        className='row justify-content-center flex-grow-1 mb-2'
      >
        <PageTitle title={title} subtitle={game} />
        <div id='tilesRow' className='row px-0 mb-auto justify-content-center'>
          {isArchive && (
            <DateSelector dateIndex={dateIndex} setDate={handleDateChange} />
          )}
          <TileDisplay
            size={
              game.includes("eight") && answer.alpha.length === 7
                ? 7
                : gameSettings.WORD_SIZE
            }
            word={
              answer.alpha
                ? answer.alpha
                : answer.word.split("").sort().join("")
            }
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

          <SubmitButton
            isArchive={isArchive}
            solved={solved}
            dateIndex={dateIndex}
            handleDateChange={handleDateChange}
            handleSubmit={handleSubmit}
          />
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
