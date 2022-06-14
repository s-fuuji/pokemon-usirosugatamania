import { PokeCard } from "../../../components/util/PokeCard";
import { usePokeSWR } from "../../../hooks/usePokeSwr";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import React from 'react'
const PokeSingle: NextPage = function () {
  const { pokemonList, pokemonListError } = usePokeSWR();
  const id = Number(useRouter().query.id);
  const indexId = Number(id) + 1;
  const pokemonListId = pokemonList ? pokemonList[id] : null;

  return (
    <>
      <div className="flex justify-center">
        <PokeCard
          imgUrl={pokemonListId?.sprites.back_default}
          link="/"
          index={indexId}
        />
        {pokemonListId?.sprites.back_female ? (
          <PokeCard
            imgUrl={pokemonListId?.sprites.back_female}
            link="/"
            index={indexId}
          />
        ) : null}
      </div>
    </>
  );
};

export default PokeSingle;
