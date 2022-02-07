import { Routes, Route } from "react-router-dom";
import Sevens from "./components/Sevens";

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path='/' element={<Sevens />} />
      </Routes>
    </div>
  );
}

export default App;
