import { useEffect, useState } from "react";
import { getSevenOfTheDay } from "./../getWord";
import LetterDisplay from "./LetterDisplay";

function Sevens() {
  const [solved, setSolved] = useState(false);
  const [guess, setGuess] = useState("");
  const [numGuesses, setGuesses] = useState(0);

  const [answer, setAnswer] = useState(null);

  if (!answer) {
    setAnswer(getSevenOfTheDay());

    // Return a laoding spinner while answer is being set
    return (
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
  }

  function handleChange(e) {
    let input = e.target.value;
    const pattern = /^[a-zA-Z]*$/;
    if (!input.match(pattern)) {
      return;
    }
    setGuess(input.toUpperCase());
  }

  // Handler for submitting a guess with the Enter key
  function handleSubmit(e) {
    e.preventDefault();
    setGuesses((prev) => prev + 1);

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
    }
  }

  return (
    <div className='container text-center'>
      <div className='row g-5'>
        <h1>Anagram of the Day</h1>
        <h2>Number of attempts: {numGuesses}</h2>
      </div>

      <div className='row g-5'>
        <LetterDisplay
          size={answer.word.length}
          word={answer.word.split("").sort().join("")}
          readOnly
        />
      </div>

      <div className='row g-5'>
        <LetterDisplay size={answer.word.length} word={guess} solved={solved} />
      </div>

      {!solved && (
        <div className='row g-5'>
          <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => handleChange(e)}
                  value={guess}
                  maxLength={7}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sevens;
