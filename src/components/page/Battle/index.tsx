import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DiceRollPhase } from '../../model/Battle/components/DiceRollPhase'
import { EndPhase } from '../../model/Battle/components/EndPhase'
import { FightingPhase } from '../../model/Battle/components/FightingPhase'
import { CreateRandomNumbers } from '../../model/Battle/functional/CreateRandomNumbers'
import { SelectPokePhase } from '../../model/Battle/components/SelectPokePhase'
import { StatusUpPhase } from '../../model/Battle/components/StatusUpPhase'
import {
  DiceCount,
  MyStaticParty,
  PartyStatus,
  PlayersStatus,
} from '../../types/battlePageTypes'
import { usePokeSWR } from '../../../api/usePokeSwr'
import { storeState } from '../../../slicer/store'
import { BattleFieldLayout } from '../../model/Battle/components/BattleFieldLayout'

export const Battle: NextPage = () => {
  const [isSelectPokePhase, setIsSelectPokePhase] = useState<boolean>(true)
  const [isDiceRollPhase, setIsDiceRollPhase] = useState<boolean>(false)
  const [isStatusUpPhase, setIsStatusUpPhase] = useState<boolean>(false)
  const [isFightPhase, setIsFightPhase] = useState<boolean>(false)
  const [isEndPhase, setIsEndPhase] = useState<boolean>(false)
  const [playersHitPoint, setPlayersHitPoint] = useState<PlayersStatus>({
    playerHp: 50,
    rivalHp: 50,
  })
  const [rivalPartyArray, setRivalPartyArray] = useState<number[]>(
    CreateRandomNumbers(0, 150, 6)
  )
  const [diceCountArray, setDiceCountArray] = useState<DiceCount>({
    threeDice: [0, 0, 0],
    totalDice: 0,
  })
  const [rivalDiceCount, setRivalDiceCount] = useState<DiceCount>({
    threeDice: [0, 0, 0],
    totalDice: 0,
  })
  const capturedPoke: number[] = useSelector(
    (state: storeState) => state.capturedPoke
  )
  const { pokemonList, error } = usePokeSWR()
  const [playersPartyStatus, setPlayersPartyStatus] = useState<PartyStatus>({
    player: [],
    rival: [],
  })
  const [playerDefaultParty, setPlayerDefaultParty] = useState<MyStaticParty>(
    []
  )

  useEffect(() => {
    const newPlayerDefaultParty = capturedPoke.map((capturedPoke, index) => {
      return {
        id: index,
        pokeIndex: capturedPoke,
        checked: false,
      }
    })
    setPlayerDefaultParty(newPlayerDefaultParty)
  }, [])

  return (
    <div>
      {!isEndPhase ? (
        isSelectPokePhase ? (
          <SelectPokePhase
            rivalPartyArray={rivalPartyArray}
            pokemonList={pokemonList}
            playerDefaultParty={playerDefaultParty}
            setIsSelectPokePhase={setIsSelectPokePhase}
            setIsDiceRollPhase={setIsDiceRollPhase}
            setPlayersPartyStatus={setPlayersPartyStatus}
            setPlayerDefaultParty={setPlayerDefaultParty}
          />
        ) : (
          <div>
            <BattleFieldLayout
              playersHitPoint={playersHitPoint}
              diceCountArray={diceCountArray}
              rivalDiceCount={rivalDiceCount}
            />

            <StatusUpPhase
              diceCountArray={diceCountArray}
              setDiceCountArray={setDiceCountArray}
              playersPartyStatus={playersPartyStatus}
              isStatusUpPhase={isStatusUpPhase}
              setIsStatusUpPhase={setIsStatusUpPhase}
              setPlayersPartyStatus={setPlayersPartyStatus}
              rivalDiceCount={rivalDiceCount}
              setIsFightPhase={setIsFightPhase}
            >
              {isFightPhase && (
                <FightingPhase
                  playersHitPoint={playersHitPoint}
                  setPlayersHitPoint={setPlayersHitPoint}
                  playersPartyStatus={playersPartyStatus}
                  setIsFightPhase={setIsFightPhase}
                  setIsDiceRollPhase={setIsDiceRollPhase}
                  setIsEndPhase={setIsEndPhase}
                />
              )}
            </StatusUpPhase>

            <DiceRollPhase
              diceCountArray={diceCountArray}
              setDiceCountArray={setDiceCountArray}
              setRivalDiceCount={setRivalDiceCount}
              isStatusUpPhase={isStatusUpPhase}
              setIsStatusUpPhase={setIsStatusUpPhase}
              isDiceRollPhase={isDiceRollPhase}
              setIsDiceRollPhase={setIsDiceRollPhase}
            />
          </div>
        )
      ) : (
        <EndPhase playersHitPoint={playersHitPoint} />
      )}
    </div>
  )
}
