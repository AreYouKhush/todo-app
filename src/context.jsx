import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = (props) => {
  const [mode, setMode] = useState("logged-out");

  return (
    <GlobalContext.Provider value={{ mode, setMode }}>
        {props.children}
    </GlobalContext.Provider>
  );
};

export default AppContext;