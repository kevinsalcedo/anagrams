import GameTile from "./GameTile";

function AlphaDisplay({ alpha, handleTap }) {
  return (
    <div className='row mx-0 my-2 px-0 justify-content-center'>
      {alpha.split("").map((value, index) => (
        <GameTile
          key={index}
          value={value}
          index={index}
          handleTap={handleTap}
          readOnly
        />
      ))}
    </div>
  );
}

export default AlphaDisplay;
