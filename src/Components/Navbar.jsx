import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const title = '<myCode />'

  const handleLogout = () => {
    logout();
  };

  return (
    <header className=" bg-urllink ">
      <div className="py-6 px-6 flex justify-between ml-5 ">
        <Link to="/">
          <h1 className="text-xl font-bold font-custom text-white hover:text-gray-400 "> {title} </h1>
        </Link>
        {user && (
          <div className="flex items-center ">
            <span className="text-gray-400 text-xs">{user.email}</span>
            <button
              className="px-2 py-1 ml-3 bg-backg rounded-md text-gray-400 hover:bg-search   hover:border border-darkpink "
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
