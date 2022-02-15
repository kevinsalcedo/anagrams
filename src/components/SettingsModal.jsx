// import { SettingsContext } from "./SettingsContext";
// import { useContext } from "react";

import { resetAllData } from "../utils/wordUtils";

function SettingsModal() {
  // const { settings, toggleEasyMode, toggleTheme } = useContext(SettingsContext);
  function resetData() {
    resetAllData();
    window.location.reload();
  }
  return (
    <div
      className='modal fade modal-centered'
      id='settingsModal'
      tabIndex='-1'
      aria-labelledby='settingsModal'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='settingsModalLabel'>
              Settings
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='container d-flex mx-auto flex-column'>
              <button className='btn bg-danger text-white' onClick={resetData}>
                Reset All Data
              </button>
            </div>
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
