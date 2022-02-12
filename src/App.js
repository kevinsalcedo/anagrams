import { Routes, Route } from "react-router-dom";
import MainNav from "./components/layout/MainNav";
import InfoModal from "./components/layout/InfoModal";
import SettingsModal from "./components/SettingsModal";
import ToastMessage from "./components/ToastMessage";
import Sevens from "./pages/Sevens";
import Eights from "./pages/Eights";
import { getGameSettings } from "./utils/settingsUtils";
import { useState } from "react";
// import { SettingsContextProvider } from "./components/SettingsContext";

function App() {
  // Toast Message data
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastmsg] = useState("");
  const [toastType, setToastType] = useState("");

  // Let the ToastMessage comoponent know if it should render
  function toggleToast(show, msg, type) {
    setToastVisible(show);
    setToastmsg(show ? msg : "");
    setToastType(show ? type : "");
  }

  return (
    // <SettingsContextProvider>
    <div className='h-100 d-flex flex-column text-center'>
      <MainNav />
      <ToastMessage
        visible={toastVisible}
        setVisible={setToastVisible}
        msg={toastMsg}
        type={toastType}
      />
      <main className='container mx-auto d-flex flex-column text-center justify-content-between flex-grow-1'>
        <Routes>
          <Route path='/' element={<Sevens game={"sevens"} toggleToast={toggleToast} title={"Anagram of the Day"}/>} />
          <Route path='/eights' element={<Eights />} />
        </Routes>
      </main>
      <InfoModal />
      <SettingsModal />
    </div>
    // </SettingsContextProvider>
  );
}

export default App;
