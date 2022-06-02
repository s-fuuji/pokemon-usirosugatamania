import { useSelector } from "react-redux";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { PartyHolder } from "./PartyHolder";

export const MyParty = () => {
  const { poke, pokeError } = usePokeSWR();
  const got = useSelector((state) => state.got);
  console.log(got);
  return got?.map((g) => {
    return (
      <PartyHolder
        key={Math.random()}
        imgurl={poke[g - 1].sprites.back_default}
        link={`./Pokemon/${g}`}
        index={g}
      />
    );
  });
};
