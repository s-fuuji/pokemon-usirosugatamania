import { PokeCard } from "../../../components/Card";
import { usePokeSWR } from "../../../hooks/usePokeSWR";
import { useRouter } from "next/router";

const PokeSingle = function () {
  const { poke, pokeError } = usePokeSWR();
  const router = useRouter();
  const id = router.query.id;
  const indexId = Number(id) + 1;
  const pokeid = poke[id];

  return (
    <>
      <PokeCard imgurl={pokeid.sprites.back_default} link="/" index={indexId} />
    </>
  );
};

export default PokeSingle;
