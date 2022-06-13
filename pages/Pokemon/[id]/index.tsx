import { PokeCard } from "../../../components/util/PokeCard";
import { usePokeSWR } from "../../../hooks/usePokeSwr";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import React from 'react'
const PokeSingle: NextPage = function () {
  const { poke, pokeError } = usePokeSWR();
  const id = Number(useRouter().query.id);
  const indexId = Number(id) + 1;
  const pokeid = poke ? poke[id] : null;

  return (
    <>
      <div className="flex justify-center">
        <PokeCard
          imgUrl={pokeid?.sprites.back_default}
          link="/"
          index={indexId}
        />
        {pokeid?.sprites.back_female ? (
          <PokeCard
            imgUrl={pokeid?.sprites.back_female}
            link="/"
            index={indexId}
          />
        ) : null}
      </div>
    </>
  );
};

export default PokeSingle;
