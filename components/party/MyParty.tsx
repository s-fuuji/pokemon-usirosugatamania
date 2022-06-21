import { useSelector } from "react-redux";
import { usePokeSWR } from "../../hooks/usePokeSwr";
import { PartyHolder } from "./PartyHolder";
import React, { FC } from 'react';
import { storeState } from "../../slicer/store";

export const MyParty: FC = () => {
  const { pokemonList, pokemonListError } = usePokeSWR();
  const got = useSelector((state: storeState) => state.got);

  return got?.map((got: number) => {
    return (
      <PartyHolder
        imgUrl={pokemonList ? pokemonList[got - 1].sprites.back_default : null}
        link={`./Pokemon/${got}`}
        key={Math.random()}

      />
    );
  });
};
