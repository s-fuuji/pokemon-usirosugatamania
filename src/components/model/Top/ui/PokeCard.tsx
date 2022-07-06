import { Card, Image, Text, Badge, Group } from '@mantine/core'
import Link from 'next/link'
import useSWR from 'swr'
import { CaptureButton } from './CaptureButton'
import React, { FC } from 'react'
import { fecher } from '../../../../api/usePokeSwr'

type Props = {
  imgUrl: string
  link: string
  index: number
  serchingPokeName?: string
}

export const PokeCard: FC<Props> = ({
  imgUrl,
  link,
  index,
  serchingPokeName,
}) => {
  const { data: pokemonListSpecies, error: spexiesError } = useSWR(
    index ? `https://pokeapi.co/api/v2/pokemon-species/${index}/` : null,
    fecher
  )

  const checkSerchPokemon =
    pokemonListSpecies?.names[0].name.indexOf(serchingPokeName)

  return serchingPokeName === undefined ||
    serchingPokeName === '' ||
    (serchingPokeName !== '' && checkSerchPokemon !== -1) ? (
    <Card shadow="sm" p="lg" className="bg-red-600 h-[19.6rem]">
      <Card.Section className="mx-auto">
        <Link href={link} style={{ marginBottom: 10 }}>
          <a>
            <div className="bg-card-back bg-cover mx-auto">
              <Image
                className="w-40 mx-auto"
                src={imgUrl}
                fit="contain"
                alt="読み込み中"
              />
            </div>
          </a>
        </Link>
      </Card.Section>
      <Group position="apart" style={{ marginBottom: 0, marginTop: 10 }}>
        <Text style={{ color: 'white', lineHeight: 1.5 }} weight={500}>
          {pokemonListSpecies?.names[0].name}
        </Text>
        <Badge color="pink" variant="light">
          GET IT!
        </Badge>
      </Group>
      <Text size="sm" style={{ color: 'white', lineHeight: 1.5 }}>
        {pokemonListSpecies?.flavor_text_entries[29].flavor_text}
      </Text>
      <CaptureButton index={index} />
    </Card>
  ) : null
}
