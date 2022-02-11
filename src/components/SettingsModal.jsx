// import { SettingsContext } from "./SettingsContext";
// import { useContext } from "react";

function SettingsModal() {
  // const { settings, toggleEasyMode, toggleTheme } = useContext(SettingsContext);
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
              <div className='form-check form-switch'>
                <label htmlFor='easyToggle' className='form-check-label'>
                  Enable Hints
                </label>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='easyToggle'
                  checked={false}
                  onChange={() => {
                    // toggleEasyMode();
                  }}
                />
              </div>
              <div className='form-check form-switch'>
                <label htmlFor='themeToggle' className='form-check-label'>
                  Dark Mode
                </label>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='themeToggle'
                  checked={false}
                  onChange={() => {
                    // toggleTheme();
                  }}
                />
              </div>
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
