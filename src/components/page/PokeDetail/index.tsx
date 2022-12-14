import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import React from 'react'
import { usePokeSWR } from '../../../api/usePokeSwr'
import { PokeCard } from '../../model/Top/ui/PokeCard'

export const PokeDetailPage: NextPage = () => {
  const { pokemonList, error, isLoading } = usePokeSWR()
  const id = Number(useRouter().query.id) - 1
  const pokemonListId = pokemonList ? pokemonList[id] : []
  const indexId = Number(id) + 1

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <div className="flex justify-around">
      <div className="w-2/5">
        <PokeCard
          imgUrl={pokemonListId.sprites.back_default}
          link="/"
          index={indexId}
        />
      </div>

      {pokemonListId.sprites.back_female && (
        <div className="w-2/5">
          <PokeCard
            imgUrl={pokemonListId.sprites.back_female}
            link="/"
            index={indexId}
          />
        </div>
      )}
    </div>
  )
}
