import { Routes, Route } from "react-router-dom";
import MainNav from "./components/MainNav";
import InfoModal from "./components/InfoModal";
import Sevens from "./pages/Sevens";
import Eights from "./pages/Eights";

function App() {
  return (
    <div className='h-100 d-flex flex-column text-center'>
      <MainNav />
      <main className='container mx-auto d-flex flex-column text-center justify-content-between flex-grow-1'>
        <Routes>
          <Route path='/' element={<Sevens />} />
          <Route path='/eights' element={<Eights />} />
        </Routes>
      </main>
      <InfoModal />
    </div>
  );
}

export default App;
