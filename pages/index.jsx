import { Button } from "@mantine/core";
import { useState } from "react";
import { BacksAll } from "../components/BacksAll";
import { BacksNoAll } from "../components/BacksNoAll";

const Home = () => {
  const [isAllPokemon, setIsAllPokemon] = useState(false);
  const toggleAllPokemon = () => {
    setIsAllPokemon(!isAllPokemon);
  };

  return (
    <>
      <Button
        onClick={toggleAllPokemon}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        オスとメスでうしろ姿が違うポケモン達
      </Button>
      <BacksAll isVisible={isAllPokemon} />
      <BacksNoAll isVisible={!isAllPokemon} />
    </>
  );
};

export default Home;
