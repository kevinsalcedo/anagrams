import MainNav from "./components/layout/MainNav";
import InfoModal from "./components/layout/InfoModal";
import SettingsModal from "./components/SettingsModal";
import ToastMessage from "./components/ToastMessage";
import { getStats } from "./utils/wordUtils";
import { useEffect, useState } from "react";
import AnagramOfTheDay from "./pages/AnagramOfTheDay";
// import { SettingsContextProvider } from "./components/SettingsContext";

function App() {
  // First time visit - initiate modal, then set flag to visited\
  // Should be able to toggle the modal via some icon in the header?
  useEffect(function () {
    updateStats();
  }, []);

  // Toast Message data
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastmsg] = useState("");
  const [toastType, setToastType] = useState("");

  const [game, setGame] = useState("sevens");

  const [stats, setStats] = useState({
    numCompleted: 0,
    numSkipped: 0,
    totalHints: 0,
    avgHints: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  function updateStats() {
    let newStats = getStats();
    setStats(newStats);
  }

  function switchGame(game) {
    setGame((prev) => game);
    toggleToast(false);
  }

  // Let the ToastMessage comoponent know if it should render
  function toggleToast(show, msg, type) {
    // Hide the toast - for when same message is set consecutively
    if (show) {
      setToastVisible(false);
    }
    setToastVisible(show);
    setToastmsg(show ? msg : "");
    setToastType(show ? type : "");
  }

  return (
    <div className='h-100 d-flex flex-column text-center'>
      <MainNav setGame={switchGame} />
      <ToastMessage
        visible={toastVisible}
        setVisible={setToastVisible}
        msg={toastMsg}
        type={toastType}
      />
      <main className='container mx-auto d-flex flex-column text-center justify-content-between flex-grow-1'>
        <AnagramOfTheDay
          game={game}
          toggleToast={toggleToast}
          title={
            game.includes("archived") ? "The Archives" : "Anagram of the Day"
          }
          updateStats={updateStats}
          isArchive={game.includes("archived-")}
        />
      </main>
      <InfoModal />
      <SettingsModal />
      <InfoModal stats={stats} />
    </div>
  );
}

export default App;
