import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import WorkoutForm from "./Components/WorkoutForm"

// import useReducerPractice from "./useReducerPractice";


function App() {
  return (
    <div className="bg-background h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/add" element={<WorkoutForm />} />
            {/* <Route path="/incdec" element={<useReducerPractice />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
