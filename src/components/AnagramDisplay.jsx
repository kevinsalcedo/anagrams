function AnagramDisplay({ word, solved }) {
  if (!word) {
    return;
  }
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {word.split("").map((value, index) => (
          <span
            key={index}
            className={`d-flex border letter-tile${
              !solved ? "-display " : ""
            } align-items-center justify-content-center ${
              solved && "bg-success bg-opacity-75 text-light"
            }`}
          >
            <p className={!solved ? "h3" : "h1"}>{value}</p>
          </span>
        ))}
      </div>
    </div>
  );
}

export default AnagramDisplay;
