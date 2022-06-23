import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { NextPage } from "next/types";
import React from 'react';
import { Pokedex } from "../components/topPage/Pokedex";

const Home: NextPage = () => {
  const [showAllPoke, setShowAllPoke] = useState(true);
  const [serchingPokeName, setSerchingPokeName] = useState("");
  const toggleShowAllPoke = () => {
    setShowAllPoke(!showAllPoke);
  };

  return (
    <div>
      <Button
        onClick={toggleShowAllPoke}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        オスとメスでうしろ姿が違うポケモン達
      </Button>

      <input
        className="ml-5"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSerchingPokeName(e.target.value)}
        placeholder="好きなポケモンを検索"

      />

      <Pokedex serchingPokeName={serchingPokeName} showAllPoke={showAllPoke} />
    </div>
  );
};

export default Home;
