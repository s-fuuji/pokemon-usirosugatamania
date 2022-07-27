import {
  Button,
  Card,
  CardSection,
  Checkbox,
  Image,
  Paper,
} from '@mantine/core'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { storeState } from '../../../../slicer/store'
import { MyStaticParty, PartyStatus } from '../../../types/battlePageTypes'
import { PhaseChange } from '../functional/PhaseChange'
import { CreateRandomNumbers } from '../functional/CreateRandomNumbers'

type Props = {
  rivalPartyArray: number[]
  pokemonList: any[] | undefined
  playerDefaultParty: MyStaticParty
  setIsSelectPokePhase: Dispatch<SetStateAction<boolean>>
  setPlayersPartyStatus: Dispatch<SetStateAction<PartyStatus>>
  setPlayerDefaultParty: Dispatch<SetStateAction<MyStaticParty>>
  setIsDiceRollPhase: Dispatch<SetStateAction<boolean>>
}

export const SelectPokePhase: React.FC<Props> = ({
  rivalPartyArray,
  pokemonList,
  playerDefaultParty,
  setIsSelectPokePhase,
  setPlayersPartyStatus,
  setPlayerDefaultParty,
  setIsDiceRollPhase,
}) => {
  const capturedPoke = useSelector((state: storeState) => state.capturedPoke)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (playerDefaultParty.filter((member) => member.checked).length === 3) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [playerDefaultParty])

  const myPartyChange = (index: number) => {
    const newMyBattleParty = playerDefaultParty.map(
      (member: any, i: number) => {
        if (i !== index) {
          return member
        } else {
          return { ...member, checked: !member.checked }
        }
      }
    )
    setPlayerDefaultParty(newMyBattleParty)
  }

  const battleStart = () => {
    const checkedMyParty = playerDefaultParty.filter((member) => member.checked)
    const rivalBattleParty = CreateRandomNumbers(0, 6, 3)
    const newPartyStatus = {
      player: checkedMyParty.map((member, index) => {
        return {
          id: index,
          imgUrl:
            pokemonList && pokemonList[member.pokeIndex].sprites.back_default,
          power: 10,
          order: 0,
          checked: false,
          disabled: false,
        }
      }),
      rival: rivalBattleParty.map((member, index) => {
        return {
          id: index,
          imgUrl: pokemonList && pokemonList[member]?.sprites.back_default,
          power: 10,
          order: 0,
          checked: false,
          disabled: false,
        }
      }),
    }
    setPlayersPartyStatus(newPartyStatus)
    PhaseChange(setIsSelectPokePhase, setIsDiceRollPhase)
  }

  return (
    <div className="text-center">
      <div className="flex justify-center gap-2">
        {rivalPartyArray?.map((rivalPokeIndex: any) => {
          return (
            <Card
              className="bg-red-600 w-52 border-white"
              shadow="sm"
              p="lg"
              radius="lg"
              withBorder
              key={rivalPokeIndex}
            >
              <Image
                key={Math.random()}
                src={
                  pokemonList &&
                  pokemonList[rivalPokeIndex].sprites.back_default
                }
                className="rounded-full w-24 mx-auto mb-5 bg-red-100"
              />
            </Card>
          )
        })}
      </div>
      <Paper className="inline-block bg-red-600 text-5xl text-white my-20 px-5 py-2 rounded-lg  ">
        VS
      </Paper>

      <div className="flex-col ">
        <div className="flex justify-center gap-2">
          {pokemonList &&
            capturedPoke?.map((gotPokeIndex: number, index: number) => {
              return (
                <label
                  htmlFor={`id_${index}`}
                  key={`key_${index}`}
                  className="flex-col"
                >
                  <Card
                    className="bg-red-600 w-52 border-white"
                    shadow="sm"
                    p="lg"
                    radius="lg"
                    withBorder
                  >
                    <Image
                      src={pokemonList[gotPokeIndex]?.sprites.back_default}
                      className="rounded-full w-24 mx-auto mb-5 bg-red-100"
                    />
                    <div className="ml-16">
                      <Checkbox
                        id={`id_${index}`}
                        size="xl"
                        disabled={
                          !playerDefaultParty[index]?.checked
                            ? isDisabled
                            : false
                        }
                        onChange={() => myPartyChange(index)}
                      />
                    </div>
                  </Card>
                </label>
              )
            })}
        </div>
        <div className="text-center mt-20">
          {!isDisabled ? (
            <Button
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
              style={{ marginBottom: 30 }}
            >
              ポケモンを3匹選んでください
            </Button>
          ) : (
            <Button
              onClick={battleStart}
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
              style={{ marginBottom: 30 }}
            >
              バトル開始
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
