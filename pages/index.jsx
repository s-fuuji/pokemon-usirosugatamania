import { Button } from "@mantine/core";
import { useState } from "react";
import { FilteredPoke } from "../components/topPage/FilteredPoke";

const Home = () => {
  const [isAllPokemon, setIsAllPokemon] = useState(false);
  const toggleAllPokemon = () => {
    setIsAllPokemon(!isAllPokemon);
  };

  return (
    <div>
      <Button
        onClick={toggleAllPokemon}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        オスとメスでうしろ姿が違うポケモン達
      </Button>

      <FilteredPoke isVisible={!isAllPokemon} />
    </div>
  );
};

export default Home;
