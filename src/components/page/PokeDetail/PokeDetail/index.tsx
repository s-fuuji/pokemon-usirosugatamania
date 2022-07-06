import { PokeCard } from '../../../model/Top/ui/PokeCard'
import { useRouter } from 'next/router'
import { GetStaticProps, NextPage } from 'next/types'
import { GetServerSideProps } from 'next/types'
import React from 'react'
import { fetcherAll, usePokeSWR } from '../../../../api/usePokeSwr'
import { SWRConfig } from 'swr'

export const PokeDetailPage: NextPage = () => {
  const { pokemonList, error, isLoading } = usePokeSWR()
  const id = Number(useRouter().query.id) - 1
  const pokemonListId = pokemonList ? pokemonList[id] : []
  const indexId = Number(id) + 1

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <div className="flex justify-center">
      <PokeCard
        imgUrl={pokemonListId.sprites.back_default}
        link="/"
        index={indexId}
      />
      {pokemonListId.sprites.back_female && (
        <PokeCard
          imgUrl={pokemonListId.sprites.back_female}
          link="/"
          index={indexId}
        />
      )}
    </div>
  )
}