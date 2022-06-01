import { PokeCard } from "../../../components/PokeCard";
import { usePokeSWR } from "../../../hooks/usePokeSwr";
import { useRouter } from "next/router";

const PokeSingle = function () {
  const { poke, pokeError } = usePokeSWR();
  const id = useRouter().query.id;
  const indexId = Number(id) + 1;
  const pokeid = poke ? poke[id] : null;

  return (
    <>
      <div className="flex justify-center">
        <PokeCard
          imgurl={pokeid?.sprites.back_default}
          link="/"
          index={indexId}
        />
        {pokeid?.sprites.back_female ? (
          <PokeCard
            imgurl={pokeid?.sprites.back_female}
            link="/"
            index={indexId}
          />
        ) : null}
      </div>
    </>
  );
};

export default PokeSingle;
