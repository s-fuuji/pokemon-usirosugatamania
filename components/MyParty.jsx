import { useContext } from "react";
import { gotContext } from "../contexts/gotPoke";
import { PokeCard } from "./Card";

export const MyParty = () => {
  const got = useContext(gotContext);
  console.log(got);
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
