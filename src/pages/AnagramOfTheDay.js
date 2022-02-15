import GameContainer from "../components/GameContainer";

function AnagramOfTheDay({ toggleToast, title, game, isArchive }) {
  return (
    <GameContainer
      toggleToast={toggleToast}
      title={title}
      game={game}
      isArchive={isArchive}
    />
  );
}

export default AnagramOfTheDay;
