import { useEffect, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { alphaLayout, alphaDisplay } from "../utils/keyboardUtils";

function SoftKeyboard({ name, handleInput, disabled }) {
  const keeb = useRef();

  // Handler for entering text through the virtual keyboard
  function handleKeyPress(e) {
    // console.log(e);
    if (disabled) {
      return;
    }
    const pattern = /^[a-zA-Z]$/;
    if (e === "{backspace}" || e === "{enter}" || pattern.test(e)) {
      handleInput(e);
    }
  }

  return (
    <div id='keyboardRow' className='mt-auto row'>
      <div className='container d-flex justify-content-center align-items-center px-0'>
        <Keyboard
          baseClass={name}
          className={name}
          keyboardRef={(r) => (keeb.current = r)}
          layout={alphaLayout}
          display={alphaDisplay}
          maxLength={7}
          onKeyPress={handleKeyPress}
          physicalKeyboardHighlight
          physicalKeyboardHighlightPress
          disableButtonHold
          // onKeyReleased={(e) => console.log(e)}
          // debug
        />
      </div>
    </div>
  );
}

export default SoftKeyboard;
