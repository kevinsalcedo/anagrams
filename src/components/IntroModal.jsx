function IntroModal() {
  return (
    <div
      className='modal fade show'
      id='introModal'
      tabIndex='-1'
      aria-labelledby='introModal'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='introModalLabel'>
              Welcome to Anagram of the Day!
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>
              Inspired by 7-letter Scrabble tile racks, Anagram of the Day
              (AOTD) provides the player with an alphagram: 7 letters sorted in
              alphabetical order. The goal is to unscramble these letters to
              find the daily anagram. And don't worry, there's only one
              solution! If the default game mode, 7s, is too easy for you, you
              can test your skills with 8s! Just like 7s, you have a 7-letter
              alphagram. The catch is, this time you have to find the 8-letter
              anagram! The 8th letter is provided for you in the correct
              position.
            </p>
            <p>
              Finding the anagrams too difficult? Use up to three hints to fill
              in extra letters!
            </p>
            <p>
              New 7 and 8-letter anagrams are available every day! And if you
              want, you can go through the archive of all of the previous days'
              anagrams. We hope you enjoy our take on word puzzle games!
            </p>
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

export default IntroModal;
