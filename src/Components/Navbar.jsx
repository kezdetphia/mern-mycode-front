import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className=" bg-blue-50  ">
      <div className="py-6 px-6 flex justify-between ">
        <Link to="/">
          <h1 className="text-xl font-bold text-primary">Workout Tracker</h1>
        </Link>
        {user && (
          <div className="">
            <span className="">{user.email}</span>
            <button
              className="px-2 py-1 ml-3 bg-mygreen rounded-md text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
