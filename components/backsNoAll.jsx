import { Grid } from "@mantine/core";
import { usePokeSWR } from "../hooks/usePokeSwr";

import { PokeCard } from "./Card";

export const BacksNoAll = ({ isVisible, getPoke }) => {
  const { poke, pokeError } = usePokeSWR();

  return (
    <Grid>
      {isVisible
        ? poke
          ? poke.map((p, index) => {
              if (p.sprites.back_female !== null) {
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
              }
              null;
            })
          : null
        : null}
    </Grid>
  );
};
//
