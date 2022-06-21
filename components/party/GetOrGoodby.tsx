import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { get, goodbye } from "../../slicer/gotPokemonSlicer";
import React, { FC } from 'react'
import { storeState } from "../../slicer/store";

type Props = {
  index: number
};

export const GetOrGoodby: FC<Props> = ({ index }) => {
  const got = useSelector((state: storeState) => state.got);
  const dispatch = useDispatch();


  const PokemonGet = (index: number) => {
    dispatch(get(index));
  };

  const PokeGoodby = (index: number) => {
    dispatch(goodbye(index));
  };

  return !got.includes(index) ? (
    <Button
      className="bg-amber-900"
      value={index}
      onClick={() => PokemonGet(index)}
      variant="light"
      color="blue"
      fullWidth
      style={{ marginTop: 14 }}
    >
      手持ちに加える
    </Button>
  ) : (
    <Button
      value={index}
      onClick={() => PokeGoodby(index)}
      variant="light"
      color="blue"
      fullWidth
      style={{ marginTop: 14 }}
    >
      手持ちから外す
    </Button>
  );
};
