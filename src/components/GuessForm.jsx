function GuessForm({
  solved = false,
  readOnly = false,
  updateGuessArray,
  handleSubmit,
  guessArray = [],
}) {
  function handleChange(e, index) {
    let input = e.target.value;
    if (input) {
      const pattern = /^[a-zA-Z]*$/;
      if (!pattern.test(input)) {
        return;
      }
      input = input.toUpperCase();
    }
  }
  function updateLetterFocus(e, index) {
    // e.preventDefault();
    // debugger;
    const newValue = e.key;
    let alteredIndex = index;

    // Check for user input
    const pattern = /^[a-zA-Z]$/;
    if (pattern.test(newValue) && e.target.value === "") {
      updateGuessArray(newValue.toUpperCase(), index);
      if (index + 1 < guessArray.length) {
        alteredIndex = index + 1;
        let sibling = document.getElementById("game-tile-" + alteredIndex);
        sibling.focus();
      }
    }

    // Handle backspacing with edge case inclusion
    const isBackspace = e.key === "Backspace";
    if (isBackspace) {
      if (!e.target.value && index > 0) {
        alteredIndex = index - 1;
        let sibling = document.getElementById("game-tile-" + alteredIndex);
        sibling.focus();
      }
      updateGuessArray("", alteredIndex);
    }

    const isSubmit = e.key === "Enter";
    if (isSubmit) {
      handleSubmit(e);
    }
  }

  return (
    <div className='container'>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='row justify-content-center'>
          {guessArray.map((value, index) => (
            <input
              key={index}
              id={`game-tile-${index}`}
              className={`border letter-tile${
                value && "-filled "
              } align-items-center justify-content-center ${
                solved && "bg-success bg-opacity-75 text-light"
              }`}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => updateLetterFocus(e, index)}
              value={guessArray[index]}
            />
          ))}
        </div>
      </form>
    </div>
  );
}

export default GuessForm;
