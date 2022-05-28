//import type { NextPage } from 'next'
//import { Button, Paper } from "@mui/material";
import { useState } from "react";
import { BacksAll } from "../components/backsAll";
import { BacksNoAll } from "../components/backsnoAll";

const Home = () => {
  const [isVisible, setIsVisivle] = useState(false);

  const VisibleChange = () => {
    setIsVisivle(!isVisible);
  };

  return (
    <>
      <div>teaa</div>
      <button onClick={VisibleChange}>ボタン</button>

      <BacksAll isVisible={isVisible} />
      <BacksNoAll isVisible={!isVisible} />
    </>
  );
};

export default Home;
