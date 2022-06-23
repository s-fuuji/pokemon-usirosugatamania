import { Card, Image, Text, Badge, Group } from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";
import { Capturing } from "../party/Capturing";
import React, { FC } from 'react';
import { fecher } from "../../hooks/usePokeSwr";

type Props = {
  imgUrl: string;
  link: string;
  index: number;
  serchingPokeName?: string;
};

export const PokeCard: FC<Props> = ({
  imgUrl,
  link,
  index,
  serchingPokeName
}) => {
  const { data: pokemonListSpecies, error: spexiesError } = useSWR(
    index ? `https://pokeapi.co/api/v2/pokemon-species/${index}/` : null,
    fecher
  );

  const checkSerchPokemon = pokemonListSpecies?.names[0].name.indexOf(
    serchingPokeName);


  return serchingPokeName === undefined || serchingPokeName === "" || (serchingPokeName !== "" && checkSerchPokemon !== -1)
    ? (
      <Card shadow="sm" p="lg" withBorder={true} className="bg-red-500">
        <Card.Section style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Link href={link} style={{ marginBottom: 5 }}>
            <a >
              <Image
                className="bg-card-back bg-cover pl-28 mx-auto"
                src={imgUrl}
                height={200}
                width={200}
                alt="読み込み中"
              />
            </a>
          </Link>
        </Card.Section>
        <Group position="apart" style={{ marginBottom: 5, marginTop: 6 }}>
          <Text weight={500}>{pokemonListSpecies?.names[0].name}</Text>
          <Badge color="pink" variant="light">
            GET IT!
          </Badge>
        </Group>
        <Text size="sm" style={{ color: "black", lineHeight: 1.5 }}>
          {pokemonListSpecies?.flavor_text_entries[22].flavor_text}
        </Text>
        <Capturing index={index} />
      </Card>
    ) : null
};
