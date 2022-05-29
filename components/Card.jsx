import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return await res.json();
};
export const PokeCard = ({ imgurl, link, index, getPoke }) => {
  const { data: pokeSpecies, error: spexiesError } = useSWR(
    index ? `https://pokeapi.co/api/v2/pokemon-species/${index}/` : null,
    fetcher
  );

  return (
    <Card shadow="sm" p="lg" withBorder={true}>
      <Card.Section style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Link href={link} marginBottom={5}>
          <a>
            <Image
              src={imgurl}
              style={{
                paddingLeft: 80,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              height={200}
              width={200}
              alt="Norway"
            />
          </a>
        </Link>
      </Card.Section>
      <Group position="apart" style={{ marginBottom: 5, marginTop: 6 }}>
        <Text weight={500}>{pokeSpecies?.varieties[0].pokemon.name}</Text>
        <Badge color="pink" variant="light">
          GET IT!
        </Badge>
      </Group>
      <Text size="sm" style={{ color: "black", lineHeight: 1.5 }}>
        {pokeSpecies?.flavor_text_entries[22].flavor_text}
      </Text>
      <Button
        value={index}
        onClick={getPoke}
        variant="light"
        color="blue"
        fullWidth
        style={{ marginTop: 14 }}
      >
        手持ちに加える
      </Button>
    </Card>
  );
};
