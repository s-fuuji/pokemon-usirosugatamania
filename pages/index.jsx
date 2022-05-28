import { useState } from "react";
import { BacksAll } from "../components/BacksAll";
import { BacksNoAll } from "../components/BacksNoAll";
import { Button } from "@mantine/core";
const Home = () => {
  const [isVisible, setIsVisivle] = useState(false);
  const [got, setGot] = useState([]);
  const [isPokeVisible, setIsPokeVisivle] = useState(false);

  const myPoke = () => {
    setIsPokeVisivle(!isPokeVisible);
  };

  const VisibleChange = () => {
    setIsVisivle(!isVisible);
  };

  const getPoke = (e) => {
    setGot((s) => {
      return [...s, e.currentTarget.value];
    });
  };
  console.log(isPokeVisible);
  return (
    <>
      <Button
        onClick={VisibleChange}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        オスとメスでうしろ姿が違うポケモン達
      </Button>

      <Button
        onClick={myPoke}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        手持ち
      </Button>

      {isPokeVisible ? <div>手持ち</div> : null}

      <BacksAll isVisible={isVisible} getPoke={getPoke} />
      <BacksNoAll isVisible={!isVisible} getPoke={getPoke} />
    </>
  );
};

export default Home;
