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
export const PokeCard = ({ imgurl, link, index }) => {
  const { data: pokeSpecies, error: spexiesError } = useSWR(
    index ? `https://pokeapi.co/api/v2/pokemon-species/${index}/` : null,
    fetcher
  );

  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Link href={link}>
          <a>
            <Image src={imgurl} height={250} alt="Norway" />
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

      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        Book classic tour now
      </Button>
    </Card>
  );
};
