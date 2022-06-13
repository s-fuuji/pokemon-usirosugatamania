import { useSelector } from "react-redux";
import { usePokeSWR } from "../../hooks/usePokeSwr";
import { PartyHolder } from "./PartyHolder";
import React from 'react'
import { storeState } from "../../slicer/store";

export const MyParty = (): any => {
  const { poke, pokeError } = usePokeSWR();
  const got = useSelector((state: storeState) => state.got);

  return got?.map((got: number) => {
    return (
      <PartyHolder
        imgUrl={poke ? poke[got - 1].sprites.back_default : null}
        link={`./Pokemon/${got}`}
        key={Math.random()}

      />
    );
  });
};
