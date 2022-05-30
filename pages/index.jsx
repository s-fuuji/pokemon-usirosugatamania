import { Button } from "@mantine/core";
import { useState } from "react";
import { BacksAll } from "../components/BacksAll";
import { BacksNoAll } from "../components/BacksNoAll";
import { MyParty } from "../components/PokemonGet";

const Home = () => {
  const [isAllPokemon, setIsAllPokemon] = useState(false);
  const [isPartyVisible, setIsPartyVisivle] = useState(false);

  const toggleMyParty = () => {
    setIsPartyVisivle(!isPartyVisible);
  };

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

      <Button
        onClick={toggleMyParty}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        手持ち
      </Button>
      <h1 className="text-red-400 text-3xl font-bold underline">
        Hello world!
      </h1>

      {isPartyVisible ? <MyParty /> : null}

      <BacksAll isVisible={isAllPokemon} />
      <BacksNoAll isVisible={!isAllPokemon} />
    </>
  );
};

export default Home;
