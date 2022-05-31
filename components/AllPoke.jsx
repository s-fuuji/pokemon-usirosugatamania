import { Grid } from "@mantine/core";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { PokeCard } from "./PokeCard";

export const AllPoke = ({ isVisible }) => {
  const { poke, pokeError } = usePokeSWR();

  return (
    <>
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
