import { useState } from "react";
import { getSevenOfTheDay, showAlert } from "../wordUtils";
import GuessForm from "./GuessForm";
import AnagramDisplay from "./AnagramDisplay";

function Sevens() {
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [guessArray, setGuessArray] = useState([]);
  const [answer, setAnswer] = useState(null);

  if (!answer) {
    resetWord();
    // Return a loading spinner while answer is being set
    return (
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
  }

  // Reset attempts & guess data, and get new uncompleted word
  function resetWord() {
    const response = getSevenOfTheDay();
    if (response) {
      setSolved(false);
      setAttempts(0);
      setAnswer(response);
      // Initialize empty array
      setGuessArray(new Array(response.word.length).fill(""));
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
      showAlert("warning", "Make sure you fill in the entire word!");
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
      showAlert("success", "Well Done!");
      return;
    }

    // Incorrect guess
    showAlert("danger", "Not Quite! Try again!");
    setGuessArray(new Array(answer.word.length).fill(""));
    document.getElementById("game-tile-0").focus();
  }

  return (
    <div className='container text-center'>
      <div className='row g-5'>
        <h1 className='display-1'>Anagram of the Day</h1>
      </div>

      <div className='row g-5'>
        <AnagramDisplay word={answer.word.split("").sort().join("")} />
      </div>

      <div className='row g-5'>
        <div id='liveAlert'></div>
      </div>

      <div className='row g-5'>
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
      <div className='row g-5'>
        <small className='text-muted'>Number of attempts: {attempts}</small>
      </div>
      <div className='row g-5'>
        <div className='container justify-content-center gx-2'>
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
            onClick={() => resetWord()}
          >
            {solved ? "Next" : "Skip"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sevens;
