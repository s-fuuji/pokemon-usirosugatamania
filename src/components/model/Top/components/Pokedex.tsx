import { Grid } from "@mantine/core";
import { usePokeSWR } from "../../../../api/usePokeSwr";
import { PokeCard } from "../ui/PokeCard";
import React, { FC } from 'react';

type Props = {
  showAllPoke: boolean;
  serchingPokeName: string;
};

export const Pokedex: FC<Props> =
  ({ showAllPoke, serchingPokeName }) => {

    const { pokemonList, error } = usePokeSWR();
    const createGridCol = (pokemonList: any, index: number) => {

      return (
        <Grid.Col key={Math.random()} span={4}>
          <PokeCard
            imgUrl={pokemonList.sprites.back_default}
            link={`./PokeDetails/${index + 1}`}
            index={index + 1}
            serchingPokeName={serchingPokeName}
          />
        </Grid.Col>
      );
    };

    return (
      <div>
        <Grid>
          {pokemonList?.map((pokemonList: any, index: number) => {

            return showAllPoke
              ? createGridCol(pokemonList, index)
              : pokemonList.sprites.back_female !== null
                ? createGridCol(pokemonList, index)
                : null;
          })}
        </Grid>
      </div>
    );
  };
