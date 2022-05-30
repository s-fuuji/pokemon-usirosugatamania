import { createContext, useState } from "react";
export const gotContext = createContext();
export const setGotContext = createContext();

export const PartyChangeContext = ({ children }) => {
  const [got, setGot] = useState([]);

  return (
    <gotContext.Provider value={got}>
      <setGotContext.Provider value={setGot}>{children}</setGotContext.Provider>
    </gotContext.Provider>
  );
};
