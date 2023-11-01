import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages & components
import Home from './Pages/Home'

import HomeCode from './Pages/HomeCode'

import Navbar from './Components/Navbar'
import WorkoutForm from "./Components/WorkoutForm"
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import CodeForm from './Components/CodeForm'

// import UseReducerPractice from "./UseReducerPractice";



function App() {
  const {user}= useAuthContext()

  return (
    <div className="bg-backg h-full w-full font-custom">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path=""
              element={user ? <HomeCode /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignupPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
   
            <Route path='/editor' element={<CodeForm />} />
            {/* <Route path="/incdec" element={<UseReducerPractice />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
