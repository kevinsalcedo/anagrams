import { useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { alphaLayout, alphaDisplay } from "../utils/keyboardUtils";

function SoftKeyboard({ name, handleInput }) {
  const keyboard = useRef();

  return (
    <div id='keyboardRow' className='mt-auto row'>
      <div className='container d-flex justify-content-center align-items-center px-0'>
        <Keyboard
          baseClass={"anagramKeeb"}
          className={name}
          keyboardRef={(r) => (keyboard.current = r)}
          layout={alphaLayout}
          display={alphaDisplay}
          maxLength={7}
          onKeyPress={handleInput}
          physicalKeyboardHighlight
          physicalKeyboardHighlightPress
          disableButtonHold
        />
      </div>
    </div>
  );
}

export default SoftKeyboard;
