import { Button } from "@mantine/core";
import { useState } from "react";
import { AllPoke } from "../components/AllPoke";
import { FilteredPoke } from "../components/FilteredPoke";

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

      <AllPoke isVisible={isAllPokemon} />
      <FilteredPoke isVisible={!isAllPokemon} />
    </>
  );
};

export default Home;
