import { Routes, Route } from "react-router-dom";
import MainNav from "./components/MainNav";
import InfoModal from "./components/InfoModal";
import Sevens from "./components/Sevens";

function App() {
  return (
    <div className='container-fluid'>
      <MainNav />
      <Routes>
        <Route path='/' element={<Sevens />} />
      </Routes>
      <InfoModal />
    </div>
  );
}

export default App;
