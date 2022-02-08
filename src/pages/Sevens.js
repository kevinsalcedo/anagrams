import { useState } from "react";
import { getSevenOfTheDay, showAlert } from "../wordUtils";
import {
  GUESS_SUCCESS,
  GUESS_INCOMPLETE,
  GUESS_INCORRECT,
  GUESS_INVALID,
} from "../assets/alertMessages";
import GuessForm from "../components/GuessForm";
import AnagramDisplay from "../components/AnagramDisplay";
import SoftKeyboard from "../components/SoftKeyboard";

function Sevens() {
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [guessArray, setGuessArray] = useState([]);
  const [answer, setAnswer] = useState(null);

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

    setGuessArray(new Array(7).fill(""));
    let firstTile = document.getElementById("game-tile-0");
    if (firstTile) {
      firstTile.focus();
    }
  }

  // Update the user's guess with given inputs
  function updateGuessArray(value, index) {
    // Null check to make sure we don't needlessly update
    if (value === "" && guessArray.join("").length === 0) {
      return;
    }
    // Create new array and update it
    let newGuess = [...guessArray];
    newGuess[index] = value;
    setGuessArray(newGuess);
  }

  // Handler for submitting a guess with the Enter key
  function handleSubmit(e) {
    e.preventDefault();
    const guess = guessArray.join("");
    if (guess.length !== guessArray.length) {
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
      return;
    }

    // Incorrect guess
    showAlert("danger", GUESS_INCORRECT);
    resetWord(false);
  }

  return (
    <>
      <div id='titleRow' className='row'>
        <h1 className='display-1'>Anagram of the Day</h1>
      </div>

      <div id='tilesRow' className='row'>
        <AnagramDisplay word={answer.word.split("").sort().join("")} />

        {solved ? (
          <AnagramDisplay word={answer.word} solved />
        ) : (
          <GuessForm
            size={answer.word.length}
            word={answer.word}
            solved={solved}
            updateGuessArray={updateGuessArray}
            handleSubmit={handleSubmit}
            guessArray={guessArray}
          />
        )}
      </div>
      <div id='buttonRow' className='row'>
        <div className='container d-flex flex-column align-items-center'>
          <div className='row '>
            <button
              className='btn btn-primary mb-2'
              style={{ width: "5rem" }}
              onClick={(e) => handleSubmit(e)}
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
        <SoftKeyboard />
      </div>
    </>
  );
}

export default Sevens;
