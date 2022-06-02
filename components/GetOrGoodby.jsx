import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { get, goodbye } from "../slicer/slicer";
export const GetOrGoodby = ({ index }) => {
  const got = useSelector((state) => state.got);
  const dispatch = useDispatch();

  const PokemonGet = (index) => {
    dispatch(get(index));
  };

  const PokeGoodby = (e) => {
    dispatch(goodbye(index));
  };

  return !got.includes(index) ? (
    <Button
      className="bg-amber-900"
      value={index}
      onClick={(e) => PokemonGet(index)}
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
      onClick={(e) => PokeGoodby(index)}
      variant="light"
      color="blue"
      fullWidth
      style={{ marginTop: 14 }}
    >
      手持ちから外す
    </Button>
  );
};
