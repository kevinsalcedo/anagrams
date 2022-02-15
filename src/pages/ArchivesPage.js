import GameContainer from "../components/GameContainer";

function ArchivesPage({ toggleToast, title, game }) {
  return (
    <GameContainer
      toggleToast={toggleToast}
      title={title}
      game={game}
      isArchive
    />
  );
}

export default ArchivesPage;
