import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//pages & components
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import WorkoutForm from "./Components/WorkoutForm"
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
// import UseReducerPractice from "./UseReducerPractice";


function App() {

  return (
    <div className="bg-background h-screen">
      <BrowserRouter>
          <Navbar />
        <div className="pages">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/add" element={<WorkoutForm />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/incdec" element={<UseReducerPractice />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
