import { Grid } from "@mantine/core";
import { usePokeSWR } from "../hooks/usePokeSWR";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
export const BacksAll = ({ isVisible }) => {
  const { poke, pokeError } = usePokeSWR();

  return (
    <Grid>
      {isVisible
        ? poke
          ? poke.map((p) => {
              return (
                <Grid.Col key={Math.random()} span={2}>
                  <img src={p.sprites.back_default} alt="" />
                </Grid.Col>
              );
            })
          : null
        : null}
    </Grid>
  );
};
