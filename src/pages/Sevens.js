import { useState } from "react";
import { getWord, markWordCompleted } from "../wordUtils";
import {
  GUESS_SUCCESS,
  GUESS_INCOMPLETE,
  GUESS_INCORRECT,
  GUESS_INVALID,
} from "../assets/alertMessages";
import PageTitle from "../components/PageTitle";
import SoftKeyboard from "../components/SoftKeyboard";
import TileDisplay from "../components/TileDisplay";
import ToastMessage from "../components/ToastMessage";

function Sevens() {
  const LIST_NAME = "sevens";
  // Game state
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [guessString, setGuessString] = useState("");

  // Toast state
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [toastType, setToastType] = useState("");

  if (!answer) {
    resetForm(true);
    return <div>Loading..</div>;
  }

  // Reset attempts & guess data, and get new uncompleted word
  function resetForm(useNewWord) {
    if (useNewWord) {
      setSolved(false);
      setAttempts(0);
      setAnswer(getWord(LIST_NAME));
    }
    setGuessString("");
    toggleToast(false);
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
      resetForm(false);
      toggleToast(true, GUESS_INVALID, "danger");
      return;
    }

    // Incorrect guess
    resetForm(false);
    toggleToast(true, GUESS_INCORRECT, "danger");
  }

  // Set the guess based on physical and virtual keyboard input
  function handleInput(character) {
    toggleToast(false);
    const pattern = /^[a-zA-Z]$/;
    if (character === "{backspace}") {
      setGuessString((prev) => {
        if (prev.length > 0) {
          return prev.substring(0, prev.length - 1);
        }
        return "";
      });
    }
    if (character === "{enter}") {
      if (solved) {
        resetForm(true);
      } else {
        handleSubmit();
      }
    }
    if (pattern.test(character)) {
      setGuessString((prev) => {
        if (prev.length < answer.word.length) {
          return prev + character.toUpperCase();
        }
        return prev;
      });
    }
  }

  // Let the ToastMessage comoponent know if it should render
  function toggleToast(show, msg, type) {
    setVisible(show);
    setMsg(show ? msg : "");
    setToastType(show ? type : "");
  }

  return (
    <>
      <ToastMessage
        visible={visible}
        setVisible={setVisible}
        msg={msg}
        type={toastType}
      />
      <div id='contentRow' className='row justify-content-center flex-grow-1'>
        <PageTitle title='Anagram of the Day' />
        <div id='tilesRow' className='row px-0 mb-auto gy-2'>
          <TileDisplay
            size={7}
            word={answer.word.split("").sort().join("")}
            readOnly
          />
          <TileDisplay size={7} word={guessString} solved={solved} />
          <small className='text-muted'>Number of attempts: {attempts}</small>
          {solved && (
            <button
              className='btn mx-auto bg-success bg-opacity-75 text-white'
              onClick={() => resetForm(true)}
              style={{ width: "5rem" }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <SoftKeyboard handleInput={handleInput} />
    </>
  );
}

export default Sevens;
