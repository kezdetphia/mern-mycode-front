import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout()
  };

  return (
    <header className="h-20 bg-blue-50  ">
      <div className="py-6 px-6 flex justify-between ">
        <Link to="/">
          <h1 className="text-xl font-bold text-primary">Workout Tracker</h1>
        </Link>
        <Link to="/signup">
          <h1 className=""> Sign Up </h1>
        </Link>
        <Link to="/login">
          <h1 className=""> Login </h1>
        </Link>
        <button onClick={handleLogout} to="/signup">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
