import { useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function SoftKeyboard({ handleChange, handleKeyUp }) {
  const keyboard = useRef();
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

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layout={newLayout}
        layoutName='alpha'
        display={display}
        // onChange={(e) => console.log(e)}
        onKeyReleased={(e) => console.log("Released")}
        className='the-keyboard'
      />
    </div>
  );
}

export default SoftKeyboard;
