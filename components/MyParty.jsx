import { useContext } from "react";
import { gotContext } from "../contexts/gotPoke";
import { PokeCard } from "./PokeCard";

export const MyParty = () => {
  const got = useContext(gotContext);
  return got?.map((g) => {
    return (
      <PokeCard
        key={Math.random()}
        imgurl={""}
        link={`./Pokemon/${g}`}
        index={g}
      />
    );
  });
};
