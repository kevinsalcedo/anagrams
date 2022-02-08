import { useState, useRef } from "react";
import { getSevenOfTheDay, showAlert } from "../wordUtils";
import {
  GUESS_SUCCESS,
  GUESS_INCOMPLETE,
  GUESS_INCORRECT,
  GUESS_INVALID,
} from "../assets/alertMessages";
import AnagramDisplay from "../components/AnagramDisplay";
import SoftKeyboard from "../components/SoftKeyboard";
import TileDisplay from "../components/TileDisplay";

function Sevens() {
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [guessString, setGuessString] = useState("");
  const keyboard = useRef();

  if (!answer) {
    resetWord(true);

    return <div>Loading..</div>;
  }

  // Reset attempts & guess data, and get new uncompleted word
  function resetWord(useNewWord) {
    if (useNewWord) {
      setSolved(false);
      setAttempts(0);
      setAnswer(getSevenOfTheDay());
    }

    setGuessString("");
  }

  // Handler for submitting a guess with the Enter key
  function handleSubmit() {
    const guess = guessString;

    if (guessString.length !== answer.word.length) {
      showAlert("warning", GUESS_INCOMPLETE);
      return;
    }

    // Increment guess attempt count
    setAttempts((prev) => prev + 1);

    if (guess === answer.word) {
      setSolved(true);

      // Mark the given asnwer's index as completed
      let completed = localStorage.getItem("completedSevens");
      if (!completed) {
        completed = [];
      } else {
        completed = JSON.parse(localStorage.getItem("completedSevens"));
      }
      localStorage.setItem(
        "completedSevens",
        JSON.stringify([...completed, answer.index])
      );
      showAlert("success", GUESS_SUCCESS);
      return;
    }

    // Incorrect characters used
    if (
      guess.split("").sort().join("") !== answer.word.split("").sort().join("")
    ) {
      showAlert("danger", GUESS_INVALID);
      resetWord(false);
      keyboard.current.clearInput();
      return;
    }

    // Incorrect guess
    showAlert("danger", GUESS_INCORRECT);
    resetWord(false);
    keyboard.current.clearInput();
  }

  // Set the guess based on physical and virtual keyboard input
  function handleGuess(guess) {
    if (guess.length <= answer.word.length) {
      setGuessString(guess);
    }
  }

  return (
    <>
      <div id='titleRow' className='row'>
        <h1 className='display-1'>Anagram of the Day</h1>
      </div>

      <div id='tilesRow' className='row'>
        <AnagramDisplay word={answer.word.split("").sort().join("")} />
        <TileDisplay size={7} word={guessString} solved={solved} />
      </div>
      <div id='buttonRow' className='row'>
        <div className='container d-flex flex-column align-items-center'>
          <div className='row '>
            <button
              className='btn btn-primary mb-2'
              style={{ width: "5rem" }}
              onClick={handleSubmit}
              disabled={solved}
            >
              Submit
            </button>
            <button
              className='btn btn-secondary mb-2'
              style={{ width: "5rem" }}
              onClick={() => resetWord(true)}
            >
              {solved ? "Next" : "Skip"}
            </button>
          </div>
        </div>
        <div className='container align-items-center'>
          <small className='text-muted'>Number of attempts: {attempts}</small>
        </div>
      </div>
      <div id='keyboardRow' className='row'>
        <SoftKeyboard
          keyboard={keyboard}
          handleInput={handleGuess}
          handleSubmit={handleSubmit}
          solved={solved}
        />
      </div>
    </>
  );
}

export default Sevens;
