function HintButton({ revealHint, displayedHints, solved }) {
  if (displayedHints.length === 3) {
    return (
      <button
        className='btn btn-danger me-1'
        style={{ width: "7.5rem " }}
        disabled={solved}
        data-bs-toggle='modal'
        data-bs-target='#confirmModal'
      >
        Give Up?
      </button>
    );
  }

  return (
    <button
      className={`btn ${solved ? "btn-success" : "btn-secondary"} me-1 ${
        solved ? "bg-opacity-75" : ""
      }`}
      style={{ width: "7.5rem" }}
      onClick={() => revealHint()}
      disabled={solved}
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
        className={`bi bi-circle-fill me-1 ${solved ? "opacity-75" : ""}`}
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
        className={`bi bi-circle-fill  ${solved ? "opacity-75" : ""}`}
        viewBox='0 0 16 16'
      >
        <circle cx='8' cy='8' r='8' />
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='white'
        className={`bi bi-circle-fill ms-1 ${solved ? "opacity-75" : ""}`}
        viewBox='0 0 16 16'
      >
        <circle cx='8' cy='8' r='8' />
      </svg>
    </button>
  );
}

export default HintButton;
