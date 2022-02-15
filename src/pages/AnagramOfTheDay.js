import GameContainer from "../components/GameContainer";

function AnagramOfTheDay({ toggleToast, title, game }) {
  return <GameContainer toggleToast={toggleToast} title={title} game={game} />;
}

export default AnagramOfTheDay;
