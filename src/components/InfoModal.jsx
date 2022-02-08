function InfoModal() {
  const wordList = localStorage.getItem("sevensList");
  const completedList = localStorage.getItem("completedSevens");

  return (
    <div
      className='modal fade'
      id='infoModal'
      tabindex='-1'
      aria-labelledby='infoModal'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='infoModalLabel'>
              AOTD Information
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>{`Number of words: ${
              wordList ? JSON.parse(wordList).length : "NaN"
            }`}</p>
            <p>{`Number completed: ${
              completedList ? JSON.parse(completedList).length : "NaN"
            }`}</p>
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

export default InfoModal;
