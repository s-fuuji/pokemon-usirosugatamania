import { Button } from "@mantine/core";
import { useContext } from "react";
import { gotContext, setGotContext } from "../contexts/gotPoke";

export const GetOrGoodby = ({ index }) => {
  const got = useContext(gotContext);
  const setGot = useContext(setGotContext);
  const PokemonGet = (e) => {
    setGot((got) => {
      return [...got, e];
    });
  };

  const PokeGoodby = (e) => {
    const removeParty = got.filter((g) => g !== e);
    setGot(removeParty);
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
