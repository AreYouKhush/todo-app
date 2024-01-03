import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const { mode, setMode } = useGlobalContext();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token", { path: "/" });
    setMode("logged-out");
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-slate-400 px-5 py-3 flex justify-center items-center text-xl font-bold text-slate-700">
        <NavLink className="text-4xl">Todo Todo</NavLink>
        <div className="fixed top-0 right-0 px-5 py-2 flex gap-6 font-semibold">
          {mode === "logged-out" ? (
            <>
              <NavLink
                to="/login"
                className="bg-slate-700 text-white px-5 py-2 hover:opacity-80"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-slate-700 text-white px-5 py-2 hover:opacity-80"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <button
              className="bg-slate-700 text-white px-5 py-2 hover:opacity-80"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
