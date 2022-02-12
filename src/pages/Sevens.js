import { useEffect, useState } from "react";
import { getWord, isWordCompleted, markWordCompleted } from "../utils/wordUtils";
import {
  GUESS_SUCCESS,
  GUESS_INCOMPLETE,
  GUESS_INCORRECT,
  GUESS_INVALID,
  SKIP_ALERT,
} from "../assets/alertMessages";
import PageTitle from "../components/layout/PageTitle";
import SoftKeyboard from "../components/SoftKeyboard";
import TileDisplay from "../components/layout/TileDisplay";

function Sevens({ toggleToast }) {
  // TODO: Make this depend on the mode
  const LIST_NAME = "sevens";
  // Game state
  const [answer, setAnswer] = useState(null);
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [guessString, setGuessString] = useState("");
  // Conditional to clear entire word on incorrect guess
  const [clearWord, setClearWord] = useState(false);


  // Load in the word of the day
  useEffect(() => {
    initWord();
  },[])

  function initWord() {
    const word = getWord(LIST_NAME);
    if(word) {
      const completed = isWordCompleted(LIST_NAME, word.index);
      setAnswer(word);
      setSolved(completed);
      setAttempts(0);
      setGuessString(completed ? word.word : "");
    }
  }
  

  if (!answer) {
    initWord();
    return <div>Loading..</div>;
  }

  // Handler for submitting a guess with the Enter key
  function handleSubmit() {
    const guess = guessString;
    if (guessString.length !== answer.word.length) {
      toggleToast(true, GUESS_INCOMPLETE, "warning");
      return;
    }

    // Increment guess attempt count
    let numAttempts = attempts + 1;
    setAttempts(numAttempts);

    if (guess === answer.word) {
      setSolved(true);
      markWordCompleted(LIST_NAME, answer.index, numAttempts);

      toggleToast(true, GUESS_SUCCESS, "success");
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
    toggleToast(false);

    const pattern = /^[a-zA-Z]$/;
    if (character === "{backspace}") {
      setGuessString((prev) => {
        if (prev.length > 0 && !clearWord) {
          return prev.substring(0, prev.length - 1);
        }
        return "";
      });
      setClearWord(false);
    }
    if (character === "{enter}") {
      if (solved || clearWord) {
        setClearWord(false);
      } else {
        handleSubmit();
      }
    }
    if (pattern.test(character)) {
      setGuessString((prev) => {
        if (prev.length < answer.word.length) {
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
      <div id='contentRow' className='row justify-content-center flex-grow-1'>
        <PageTitle title='Anagram of the Day' />
        <div id='tilesRow' className='row px-0 mb-auto gy-2'>
          <TileDisplay
            size={7}
            word={answer.word.split("").sort().join("")}
            readOnly
            handleTap={handleInput}
          />
          <TileDisplay size={7} word={guessString} solved={solved} />
        </div>
      </div>
      <SoftKeyboard handleInput={handleInput} disabled={solved} />
    </>
  );
}

export default Sevens;
