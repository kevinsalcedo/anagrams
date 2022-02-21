function HintButton({ revealHint, displayedHints }) {
  return (
    <button
      className='btn btn-secondary opacity-75 me-1'
      style={{ width: "7.5rem" }}
      onClick={() => revealHint()}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill={
          displayedHints.length === 0
            ? "white"
            : displayedHints.length === 1
            ? "green"
            : displayedHints.length === 2
            ? "orange"
            : "red"
        }
        className='bi bi-circle-fill me-1'
        viewBox='0 0 16 16'
      >
        <circle cx='8' cy='8' r='8' />
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill={
          displayedHints.length === 0 || displayedHints.length === 1
            ? "white"
            : displayedHints.length === 2
            ? "orange"
            : "red"
        }
        className='bi bi-circle-fill'
        viewBox='0 0 16 16'
      >
        <circle cx='8' cy='8' r='8' />
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill={
          displayedHints.length === 0 ||
          displayedHints.length === 1 ||
          displayedHints.length === 2
            ? "white"
            : "red"
        }
        className='bi bi-circle-fill ms-1'
        viewBox='0 0 16 16'
      >
        <circle cx='8' cy='8' r='8' />
      </svg>
    </button>
  );
}

export default HintButton;
