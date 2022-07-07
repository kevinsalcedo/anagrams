import { resetAllData, resetDataForList } from "../utils/wordUtils";

function SettingsModal() {
  return (
    <div
      className='modal fade'
      id='settingsModal'
      tabIndex='-1'
      aria-labelledby='settingsModal'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
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
            <div className='container d-flex mx-auto  flex-column w-50'>
              <button
                className='btn bg-danger text-white dropdown-toggle'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Reset Data
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => resetDataForList("sevens")}
                  >
                    Daily Sevens Data
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => resetDataForList("eights")}
                  >
                    Daily Eights Data
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => resetDataForList("archived-sevens")}
                  >
                    Archive Sevens Data
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => resetDataForList("archived-eights")}
                  >
                    Archive Eights Data
                  </button>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => resetAllData()}
                  >
                    Reset All Data
                  </button>
                </li>
              </ul>
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
