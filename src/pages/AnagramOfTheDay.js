import GameContainer from "../components/GameContainer";

function AnagramOfTheDay({ toggleToast, title, game, isArchive, updateStats }) {
  return (
    <GameContainer
      toggleToast={toggleToast}
      title={title}
      game={game}
      isArchive={isArchive}
      updateStats={updateStats}
    />
  );
}

export default AnagramOfTheDay;
