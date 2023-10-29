import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages & components
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import WorkoutForm from "./Components/WorkoutForm"
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
// import UseReducerPractice from "./UseReducerPractice";


function App() {
  const {user}= useAuthContext()

  return (
    <div className="bg-background h-screen">
      <BrowserRouter>
          <Navbar />
        <div className="pages">
          <Routes>
            <Route path="" element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path="/add" element={<WorkoutForm />} />
            <Route path="/signup" element={ !user ? <SignupPage /> : <Navigate to='/'/>} />
            <Route path="/login" element={!user ?  <LoginPage /> : <Navigate to='/' />} />
            {/* <Route path="/incdec" element={<UseReducerPractice />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
