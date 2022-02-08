import { Routes, Route } from "react-router-dom";
import MainNav from "./components/MainNav";
import InfoModal from "./components/InfoModal";
import Sevens from "./pages/Sevens";
import Eights from "./pages/Eights";

function App() {
  return (
    <div className='container-fullwidth overflow-hidden vh-100'>
      <MainNav />
      <div id='liveAlert'></div>
      <div className='text-center d-flex flex-column justify-content-evenly h-75'>
        <Routes>
          <Route path='/' element={<Sevens />} />
          <Route path='/eights' element={<Eights />} />
        </Routes>
      </div>
      <InfoModal />
    </div>
  );
}

export default App;
