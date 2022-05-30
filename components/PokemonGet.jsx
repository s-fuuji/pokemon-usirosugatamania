import { useContext } from "react";
import { gotContext, setGotContext } from "../pages/_app";
import { PokeCard } from "./Card";

export const PokemonGet = (e) => {
  const setGot = useContext(setGotContext);
  setGot((s) => {
    return [...s, e.currentTarget.value];
  });
};

export const MyParty = () => {
  const got = useContext(gotContext);

  return got?.map((g) => {
    return <PokeCard imgurl={""} link={`./Pokemon/${g}`} index={g} />;
  });
};
