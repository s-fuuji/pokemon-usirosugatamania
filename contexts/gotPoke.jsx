import { createContext, useState } from "react";
export const gotContext = createContext();
export const setGotContext = createContext();

export const clearedQuizContext = createContext();
export const setClearedQuizContext = createContext();

export const PartyChangeContext = ({ children }) => {
  const [got, setGot] = useState([]);
  const [clearedQuiz, setClearedQuiz] = useState({
    red: "未挑戦",
    gold: "未挑戦",
    ruby: "未挑戦",
  });

  return (
    <clearedQuizContext.Provider value={clearedQuiz}>
      <setClearedQuizContext.Provider value={setClearedQuiz}>
        <gotContext.Provider value={got}>
          <setGotContext.Provider value={setGot}>
            {children}
          </setGotContext.Provider>
        </gotContext.Provider>
      </setClearedQuizContext.Provider>
    </clearedQuizContext.Provider>
  );
};
