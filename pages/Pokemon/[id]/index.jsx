import { PokeCard } from "../../../components/Card";
import { usePokeSWR } from "../../../hooks/usePokeSwr";
import { useRouter } from "next/router";

const PokeSingle = function () {
  const { poke, pokeError } = usePokeSWR();
  const id = useRouter().query.id;
  const indexId = Number(id) + 1;
  const pokeid = poke ? poke[id] : null;

  return (
    <>
      <PokeCard
        imgurl={pokeid?.sprites.back_default}
        link="/"
        index={indexId}
      />
    </>
  );
};

export default PokeSingle;
