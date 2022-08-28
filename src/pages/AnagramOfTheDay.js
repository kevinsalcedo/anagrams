import GameContainer from "../components/GameContainer";

function AnagramOfTheDay({
  toggleToast,
  title,
  game,
  isArchive,
  updateStats,
  switchGame,
}) {
  return (
    <GameContainer
      toggleToast={toggleToast}
      title={title}
      game={game}
      isArchive={isArchive}
      updateStats={updateStats}
      switchGame={switchGame}
    />
  );
}

export default AnagramOfTheDay;
