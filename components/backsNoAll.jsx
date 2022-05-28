import { Grid } from "@mantine/core";
import { usePokeSWR } from "../hooks/usePokeSWR";
import Link from 'next/link';
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";

export const BacksNoAll = ({ isVisible }) => {
  const { poke, pokeError } = usePokeSWR();

  console.log(isVisible);

  return (
    <Grid>
      {isVisible
        ? poke
          ? poke.map((p) => {
              if (p.sprites.back_female !== null) {
                return (
                  <Grid.Col key={Math.random()} span={3}>
                    <Card shadow="sm" p="lg">
                      <Card.Section>
                        <Link href="/"><a><Image
                          src={p.sprites.back_default}
                          height={250}
                          alt="Norway"
                        /></a></Link>
                        
                      </Card.Section>
                      <Group
                        position="apart"
                        style={{ marginBottom: 5, marginTop: 6 }}
                      >
                        <Text weight={500}>Norway Fjord Adventuresa</Text>
                        <Badge color="pink" variant="light">
                          GET IT!
                        </Badge>
                      </Group>
                      <Text
                        size="sm"
                        style={{ color: "black", lineHeight: 1.5 }}
                      >
                        With Fjord Tours you can explore more of the magical
                        fjord landscapes with tours and activities on and around
                        the fjords of Norway
                      </Text>

                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                      >
                        Book classic tour now
                      </Button>
                    </Card>
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
