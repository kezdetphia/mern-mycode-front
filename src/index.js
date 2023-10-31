import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WorkoutsContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CodesContextProvider } from "./context/CodesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CodesContextProvider>
        <WorkoutsContextProvider>
          <App />
        </WorkoutsContextProvider>
      </CodesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
