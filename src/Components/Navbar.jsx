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
    <header className=" bg-primary ">
      <div className="py-6 px-6 flex justify-between ">
        <Link to="/">
          <h1 className="text-xl font-bold font-custom "> {title} </h1>
        </Link>
        {user && (
          <div className="flex items-center ">
            <span className="text-background text-xs">{user.email}</span>
            <button
              className="px-2 py-1 ml-3 bg-background rounded-md text-textcolor hover:bg-secondary"
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
