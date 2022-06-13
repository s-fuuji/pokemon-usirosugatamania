import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { FilteredPoke } from "../components/topPage/FilteredPoke";
import { NextPage } from "next/types";
import React from 'react'
const Home: NextPage = () => {
  const [isAllPokemon, setIsAllPokemon] = useState(false);
  const [serchPokemon, setSerchPokemon] = useState("")
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

      <input
        className="ml-5"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSerchPokemon(e.target.value)}
        placeholder="好きなポケモンを検索"

      />

      <FilteredPoke serchPokemon={serchPokemon} isAllPokemon={!isAllPokemon} />
    </div>
  );
};

export default Home;
