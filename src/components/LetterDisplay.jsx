import { useState, useEffect } from "react";

function LetterDisplay({ size, word = "", solved = false, readOnly = false }) {
  const [letters, setLetters] = useState([]);

  // Create the tiles
  if (!letters.length) {
    let display = Array(size).fill("");
    setLetters(display);
  }

  // Update the display when the guess changes
  useEffect(() => {
    setLetters(() => {
      let newLetters = Array(size).fill("");
      word.split("").map((value, index) => (newLetters[index] = value));
      return newLetters;
    });
  }, [size, word]);

  return (
    <div className='d-flex container align-items-center justify-content-center'>
      {letters.map((value, index) => (
        <span
          key={index}
          className={`d-flex border letter-tile${
            readOnly ? "-display " : ""
          } align-items-center justify-content-center ${
            solved && "bg-success bg-opacity-75 text-light"
          }`}
        >
          <p className={readOnly ? "h3" : "h1"}>{value}</p>
        </span>
      ))}
    </div>
  );
}

export default LetterDisplay;
