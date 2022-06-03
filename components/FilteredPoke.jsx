import { Grid } from "@mantine/core";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { PokeCard } from "./PokeCard";

export const FilteredPoke = ({ isVisible }) => {
  const { poke, pokeError } = usePokeSWR();

  const gridCard = (p, index) => {
    return (
      <Grid.Col key={Math.random()} span={4}>
        <PokeCard
          imgurl={p.sprites.back_default}
          link={`./Pokemon/${index}`}
          index={Number(index) + 1}
        />
      </Grid.Col>
    );
  };

  return (
    <Grid>
      {poke?.map((p, index) => {
        return isVisible
          ? gridCard(p, index)
          : p.sprites.back_female !== null
          ? gridCard(p, index)
          : null;
      })}
    </Grid>
  );
};
