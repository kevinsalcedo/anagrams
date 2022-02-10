import { useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { alphaLayout, alphaDisplay } from "../assets/keyboardUtils";

function SoftKeyboard({ handleInput }) {
  const keeb = useRef();

  // Handler for entering text through the virtual keyboard
  function handleKeyPress(e) {
    const pattern = /^[a-zA-Z]$/;
    if (e === "{backspace}" || e === "{enter}" || pattern.test(e)) {
      handleInput(e);
    }
  }

  return (
    <div id='keyboardRow' className='mt-auto row'>
      <div className='container d-flex justify-content-center align-items-center px-0'>
        <Keyboard
          keyboardRef={(r) => (keeb.current = r)}
          layout={alphaLayout}
          display={alphaDisplay}
          maxLength={7}
          onKeyPress={handleKeyPress}
          physicalKeyboardHighlight
          physicalKeyboardHighlightPress
        />
      </div>
    </div>
  );
}

export default SoftKeyboard;
