import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "./context";
import axios from "axios";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode, setMode } = useGlobalContext();

  const authVerifyToken = async () => {
    const response = await axios.get("http://localhost:3000/user/auth", {
      headers: {
        token: cookies.token,
      },
    });
    if(response.data.msg === "Success"){
      setMode("logged-in")
    }else{
      setMode("logged-out")
    }
  };

  useEffect(() => {
    if(cookies.token){
      setMode("logged-in");
    }
    authVerifyToken();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
