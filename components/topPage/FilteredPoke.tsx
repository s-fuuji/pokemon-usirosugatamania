import { Grid } from "@mantine/core";
import { usePokeSWR } from "../../hooks/usePokeSwr";
import { PokeCard } from "../util/PokeCard";
import React from 'react'

type Props = {
  isAllPokemon: boolean,
  serchPokemon: string
}

export const FilteredPoke: React.FC<Props> = React.memo(
  ({ isAllPokemon, serchPokemon }) => {
    const { poke, pokeError } = usePokeSWR();
    //console.log(serchPokemon);


    const gridCard = (poke: any, index: number) => {
      return (
        <Grid.Col key={Math.random()} span={4}>
          <PokeCard
            imgUrl={poke.sprites.back_default}
            link={`./Pokemon/${index}`}
            index={Number(index) + 1}
            serchPokemon={serchPokemon}
          />
        </Grid.Col>
      );
    };

    return (
      <Grid>
        {poke?.map((poke: any, index: number) => {
          return isAllPokemon
            ? gridCard(poke, index)
            : poke.sprites.back_female !== null
              ? gridCard(poke, index)
              : null;
        })}
      </Grid>
    );
  });
