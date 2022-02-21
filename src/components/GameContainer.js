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
  getDisplayedHintsForWord,
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
import TileInput from "./layout/TileInput";
import DateSelector from "./DateSelector";
import SubmitButton from "./SubmitButton";
import AlphaDisplay from "./layout/AlphaDisplay";
import HintButton from "./HintButton";

function GameContainer({ toggleToast, title, game, isArchive = false }) {
  // Game state
  const [gameState, setGameState] = useState({
    answer: null,
    solved: false,
    userGuess: [],
    dateIndex: -1,
    displayedHints: [],
  });

  const [gameSettings, setGameSettings] = useState(null);
  const { dateIndex, solved, userGuess, answer, displayedHints } = gameState;

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
        newState.userGuess = completed
          ? word.word.split("")
          : Array(word.word.length).fill("");
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
    let guessCopy = [...userGuess];

    let msg = GUESS_INCORRECT;
    let type = "danger";

    // User has not filled in entire guess
    if (guessCopy.indexOf("") >= 0) {
      msg = GUESS_INCOMPLETE;
      type = "warning";
    }
    // Correct answer
    else if (guessCopy.join("") === answer.word) {
      newState.solved = true;
      markWordCompleted(game, answer.index, displayedHints);
      msg = GUESS_SUCCESS;
      if (isArchive) {
        msg = isValidIndex(dateIndex + 1) ? ARCHIVE_NEXT : ARCHIVE_END;
      }
      type = "success";
    }

    // Incorrect characters used
    else if (
      guessCopy.sort().join("") !== answer.word.split("").sort().join("")
    ) {
      msg = GUESS_INVALID;
    }

    updateGameState(newState);
    toggleToast(true, msg, type);
  }

  // Set the guess based on physical and virtual keyboard input
  function handleInput(character) {
    const newState = { ...gameState };

    if (solved && !isArchive) {
      return;
    }

    const pattern = /^[a-zA-Z]$/;
    // Character A-Z entered
    if (pattern.test(character)) {
      if (solved) {
        return;
      }
      // Update the new guess
      if (userGuess.indexOf("") >= 0) {
        let preFilledGuess = getPrefilledGuess();

        let openIndex = preFilledGuess.indexOf("");
        preFilledGuess[openIndex] = character.toUpperCase();
        newState.userGuess = preFilledGuess;
      }
    }

    // Backspace hit
    if (character === "{backspace}") {
      if (solved) {
        return;
      }

      let preFilledGuess = getPrefilledGuess();
      let openIndex = preFilledGuess.indexOf("");
      let startIndex = preFilledGuess.length - 1;
      if (openIndex >= 0) {
        startIndex = openIndex - 1;
      }

      for (let i = startIndex; i >= 0; i--) {
        if (!isHintIndex(i)) {
          preFilledGuess[i] = "";
          break;
        }
      }
      newState.userGuess = preFilledGuess;
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

  // Return array of given letters and the guess string
  function getPrefilledGuess() {
    let split = answer.word.split("");
    let guessArray = Array(answer.word.length).fill("");
    // Fill 8s given letter
    if (answer.letterIndex && answer.letter) {
      guessArray[answer.letterIndex] = answer.letter;
    }

    // Fill displayed hints
    for (let idx = 0; idx < displayedHints.length; idx++) {
      let position = displayedHints[idx];
      guessArray[position] = split[position];
    }

    // Fill in guess from user input array
    for (let i = 0; i < userGuess.length; i++) {
      if (!isHintIndex(i)) {
        guessArray[i] = userGuess[i];
      }
    }

    return guessArray;
  }

  // Return true if index matches the given letter or displayed hints
  function isHintIndex(idx) {
    return (
      displayedHints.includes(idx) ||
      (answer.letterIndex >= 0 && answer.letterIndex === idx)
    );
  }

  // Setter for the datepicker
  function handleDateChange(date) {
    let dayDiff = getDayDiff(date);
    if (!isValidDate(date)) {
      return;
    }
    updateGameState({ ...gameState, dateIndex: dayDiff });
  }

  // Setter for hint display
  function revealHint() {
    if (displayedHints.length < 3 && answer.hints) {
      let newHints = [...displayedHints];
      let revealedIndex = answer.hints[newHints.length];
      newHints.push(revealedIndex);

      let g = getPrefilledGuess();
      g[revealedIndex] = answer.word.split("")[revealedIndex];

      updateGameState({ ...gameState, displayedHints: newHints, userGuess: g });
    }
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
          <AlphaDisplay
            alpha={
              answer.alpha
                ? answer.alpha
                : answer.word.split("").sort().join("")
            }
            handleTap={handleInput}
            userGuess={userGuess}
          />
          <TileInput
            solved={solved}
            fillLetter={game.includes("eight") ? answer.letter : null}
            fillIndex={game.includes("eight") ? answer.letterIndex : null}
            hints={displayedHints}
            answer={answer.word}
            userGuess={userGuess}
          />

          <div className='container'>
            <HintButton
              revealHint={revealHint}
              displayedHints={displayedHints}
              solved={solved}
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
