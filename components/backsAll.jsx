import { Grid } from "@mantine/core";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { PokeCard } from "./Card";

export const BacksAll = ({ isVisible, getPoke }) => {
  const { poke, pokeError } = usePokeSWR();

  return (
    <>
      <button value={2} onClick={getPoke}>
        test
      </button>
      <Grid>
        {isVisible
          ? poke
            ? poke.map((p, index) => {
                return (
                  <Grid.Col key={Math.random()} span={4}>
                    <PokeCard
                      imgurl={p.sprites.back_default}
                      link={`./Pokemon/${index}`}
                      index={Number(index) + 1}
                      getPoke={getPoke}
                    />
                  </Grid.Col>
                );
              })
            : null
          : null}
      </Grid>
    </>
  );
};
