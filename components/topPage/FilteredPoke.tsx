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
    const { pokemonList, pokemonListError } = usePokeSWR();
    //console.log(serchPokemon);


    const gridCard = (pokemonList: any, index: number) => {
      return (
        <Grid.Col key={Math.random()} span={4}>
          <PokeCard
            imgUrl={pokemonList.sprites.back_default}
            link={`./Pokemon/${index}`}
            index={Number(index) + 1}
            serchPokemon={serchPokemon}
          />
        </Grid.Col>
      );
    };

    return (
      <Grid>
        {pokemonList?.map((pokemonList: any, index: number) => {
          return isAllPokemon
            ? gridCard(pokemonList, index)
            : pokemonList.sprites.back_female !== null
              ? gridCard(pokemonList, index)
              : null;
        })}
      </Grid>
    );
  });
