import { useSelector } from 'react-redux'
import { usePokeSWR } from '../../../../api/usePokeSwr'
import { PartyHolder } from './PartyHolder'
import React, { FC } from 'react'
import { storeState } from '../../../../slicer/store'

export const MyParty: FC = () => {
  const { pokemonList, error } = usePokeSWR()
  const capturedPoke = useSelector((state: storeState) => state.capturedPoke)

  return capturedPoke?.map((capturedPoke: number) => {
    return (
      <div key={Math.random()}>
        <PartyHolder
          imgUrl={
            pokemonList
              ? pokemonList[capturedPoke - 1].sprites.back_default
              : null
          }
          link={`./Pokemon/${capturedPoke}`}
        />
      </div>
    )
  })
}
