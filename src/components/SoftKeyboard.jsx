import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useEffect } from "react";

function SoftKeyboard({ keyboard, handleInput, handleSubmit, solved }) {
  const newLayout = {
    alpha: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "{enter} Z X C V B N M {bksp}",
    ],
  };

  const display = {
    "{enter}": "Enter",
    "{bksp}": "Del",
  };

  // Link KeyUp event with the keyboard - probably won't work on android
  useEffect(
    function () {
      document.addEventListener("keyup", function (e) {
        e.preventDefault();
        const pattern = /^[a-zA-Z]$/;
        let key = e.key;
        if (keyboard && key) {
          let id = "";
          if (pattern.test(key)) {
            id = key.toUpperCase();
          } else if (key === "Backspace") {
            id = "{bksp}";
          } else if (key === "Enter") {
            id = "{enter}";
          }

          if (id) {
            let btn = document.querySelector(`[data-skbtn="${id}"]`);
            if (btn) {
              btn.click();
            }
          }
        }
      });
    },
    [keyboard]
  );

  // Handler for entering text through virtual keyboard
  function onSoftKeyboardPress(e) {
    if (solved) {
      return;
    }
    handleInput(e);
  }

  // Handler for guess submission through the virtual keyboard
  function handleKeyPress(e) {
    if (e === "{enter}" && !solved) {
      handleSubmit();
    }
  }

  return (
    <div className='container d-flex justify-content-center align-items-center px-0'>
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layout={newLayout}
        layoutName='alpha'
        display={display}
        maxLength={7}
        onChange={onSoftKeyboardPress}
        onKeyPress={handleKeyPress}
        disableButtonHold
        useMouseEvents
        autoUseTouchEvents
      />
    </div>
  );
}

export default SoftKeyboard;
