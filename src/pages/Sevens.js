import { useState, useRef } from "react";
import { getSevenOfTheDay } from "../wordUtils";
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
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [guessString, setGuessString] = useState("");
  const keyboard = useRef();

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [toastType, setToastType] = useState("");

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
    if (keyboard.current) {
      keyboard.current.clearInput();
    }
    setGuessString("");
  }

  // Handler for submitting a guess with the Enter key
  function handleSubmit() {
    const guess = guessString;
    if (guessString.length !== answer.word.length) {
      showToast(GUESS_INCOMPLETE, "warning");
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

      showToast(GUESS_SUCCESS, "success");
      return;
    }

    // Incorrect characters used
    if (
      guess.split("").sort().join("") !== answer.word.split("").sort().join("")
    ) {
      // resetWord(false);
      showToast(GUESS_INVALID, "danger");
      return;
    }

    // Incorrect guess
    // resetWord(false);
    showToast(GUESS_INCORRECT, "danger");
  }

  // Set the guess based on physical and virtual keyboard input
  function handleGuess(guess) {
    if (guess.length <= answer.word.length) {
      setVisible(false);
      setGuessString(guess);
    }
  }

  function showToast(msg, type) {
    setMsg(msg);
    setVisible(true);
    setToastType(type);
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
              onClick={() => resetWord(true)}
              style={{ width: "5rem" }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <SoftKeyboard
        keyboard={keyboard}
        handleInput={handleGuess}
        handleSubmit={handleSubmit}
        solved={solved}
      />
    </>
  );
}

export default Sevens;
