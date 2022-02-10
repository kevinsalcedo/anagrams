import { useState } from "react";
import { getWordList, getListData } from "../wordUtils";
function InfoModal() {
  const wordList = getWordList("sevens");
  const listData = getListData("sevens");
  const [wordsVisible, setWordsVisible] = useState(false);

  let avgAttempts = 0;
  if (listData && listData.completed.length) {
    console.log(listData);
    avgAttempts = listData.attempts / listData.completed.length;
  }

  return (
    <div
      className='modal fade modal-centered'
      id='infoModal'
      tabIndex='-1'
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
            <p>{`Number of 7-letter words: ${
              wordList ? wordList.length : "0"
            }`}</p>
            <p>{`Number completed: ${listData.completed.length}`}</p>
            <p>{`Average attempts per word: ${avgAttempts.toFixed(2)}`}</p>
            {wordsVisible && listData.completed.map((word) => <p>{word}</p>)}
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => setWordsVisible((state) => !state)}
            >
              {wordsVisible ? "Hide" : "Show"} Completed Words
            </button>
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
