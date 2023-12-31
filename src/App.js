import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useCodesContext } from "./hooks/useCodesContext";

import { useEffect } from "react";

//pages & components
import HomeCode from "./Pages/HomeCode";
import Navbar from "./Components/Navbar";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import CodeForm from "./Components/CodeForm";
import CodeDetails from "./Pages/CodeDetails";
import LandingPage from "./Pages/LandingPage";


function App() {
  const { user } = useAuthContext();
  const { dispatch, codes } = useCodesContext();
  console.log('app.js render')

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_LIVE}/api/codes`,
        // "https://mern-workout-back.onrender.com/api/codes",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CODE", payload: data });
      }
    };

    if (user) fetchCodes();
    // Run fetch if user changes or a dispatch is being called
  }, [dispatch, user]);

  return (
    <div className="bg-backg font-custom">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <HomeCode /> : <LandingPage />} />

          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupPage />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route path="/:id" element={<CodeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
