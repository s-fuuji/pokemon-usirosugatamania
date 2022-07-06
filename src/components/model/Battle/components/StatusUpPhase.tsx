import { Button, Checkbox, Image, Paper } from '@mantine/core'
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import { DiceCount, PartyStatus } from '../../../types/battlePageTypes'
import { PhaseChange } from '../functional/PhaseChange'
import { CreateRandomNumbers } from '../functional/CreateRandomNumbers'

type Props = {
  setDiceCountArray: Dispatch<SetStateAction<DiceCount>>
  setPlayersPartyStatus: Dispatch<SetStateAction<PartyStatus>>
  setIsFightPhase: Dispatch<SetStateAction<boolean>>
  setIsStatusUpPhase: Dispatch<SetStateAction<boolean>>
  isStatusUpPhase: boolean
  diceCountArray: DiceCount
  rivalDiceCount: DiceCount
  playersPartyStatus: PartyStatus
  children: ReactNode
}

export const StatusUpPhase: React.FC<Props> = ({
  diceCountArray,
  setDiceCountArray,
  playersPartyStatus,
  setPlayersPartyStatus,
  isStatusUpPhase,
  rivalDiceCount,
  setIsFightPhase,
  setIsStatusUpPhase,
  children,
}) => {
  const rivalPowerUp = (): void => {
    let newRivalPartyStatus = playersPartyStatus.rival
    for (let i = rivalDiceCount.totalDice; i > 0; i--) {
      const powerUpIndex = CreateRandomNumbers(0, 2, 1)[0]
      const preRivalPartyStatus = newRivalPartyStatus.map((rival) => {
        return rival.id === powerUpIndex
          ? { ...rival, power: rival.power + 1 }
          : rival
      })
      newRivalPartyStatus = preRivalPartyStatus
    }

    const shuffleNumber = CreateRandomNumbers(0, 2, 3)
    newRivalPartyStatus = newRivalPartyStatus.map((prev, index: number) => {
      return { ...prev, order: shuffleNumber[index] }
    })

    setPlayersPartyStatus({ ...playersPartyStatus, rival: newRivalPartyStatus })
  }

  const powerUp = (powerUpIndex: number, up?: string): void => {
    if (
      (up && diceCountArray.totalDice > 0) ||
      (!up && playersPartyStatus.player[powerUpIndex].power > 0)
    ) {
      const powerUpPokemon = playersPartyStatus.player.map((member) => {
        return member.id === powerUpIndex
          ? { ...member, power: member.power + (up ? +1 : -1) }
          : member
      })
      const newPartyStatus = {
        ...playersPartyStatus,
        player: powerUpPokemon,
      }
      setDiceCountArray({
        ...diceCountArray,
        totalDice: diceCountArray.totalDice + (up ? -1 : 1),
      })
      setPlayersPartyStatus(newPartyStatus)
    } else {
      console.log('null')
    }
  }

  const selectFighter = (order: number): void => {
    const orderIndex = playersPartyStatus.player.filter(
      (fighter) => fighter.checked
    ).length
    const newPartyStatus = playersPartyStatus.player.map((fighter) => {
      return fighter.id === order
        ? {
            ...fighter,
            order: orderIndex,
            checked: !fighter.checked,
            disabled: true,
          }
        : fighter
    })
    setPlayersPartyStatus({ ...playersPartyStatus, player: newPartyStatus })
  }

  const orderLiset = (): void => {
    const newPlayerPartyStatus = playersPartyStatus.player.map((prev) => {
      return { ...prev, order: 0, checked: false }
    })
    setPlayersPartyStatus({
      ...playersPartyStatus,
      player: newPlayerPartyStatus,
    })
  }

  useEffect(() => {
    orderLiset()
  }, [isStatusUpPhase])

  const startFight = (): void => {
    rivalPowerUp()
    PhaseChange(setIsStatusUpPhase, setIsFightPhase)
  }

  return (
    <div className="flex justify-around">
      <div>
        {playersPartyStatus.player.map((member: any, index: number) => {
          return (
            <div key={index} className="flex items-center">
              {isStatusUpPhase && (
                <div>
                  <Button
                    onClick={() => powerUp(index, 'up')}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                  >
                    +
                  </Button>
                  <Button
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                  >
                    {member.power}
                  </Button>
                  <Button
                    onClick={() => powerUp(index)}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                  >
                    -
                  </Button>
                </div>
              )}
              <div className="flex-col items-center justify-center text-right">
                {isStatusUpPhase && (
                  <Paper className="inline-block bg-red-600 text-base text-white px-1 rounded-md">
                    順番を決める
                  </Paper>
                )}
                <label
                  className="flex"
                  htmlFor={`battleId_${index}`}
                  key={`battleKey_${index}`}
                >
                  <Image src={member.imgUrl} className="rounded-full w-40" />
                  {isStatusUpPhase && (
                    <Checkbox
                      size="xl"
                      id={`battleId_${index}`}
                      disabled={playersPartyStatus.player[index].checked}
                      onChange={() => selectFighter(index)}
                      checked={playersPartyStatus.player[index].checked}
                    />
                  )}
                </label>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex-col -ml-32 text-center">
        {playersPartyStatus.player.filter((fighter) => fighter.checked)
          .length === 3 && (
          <div>
            <div className="my-6">
              <Button
                onClick={orderLiset}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              >
                順番をリセット
              </Button>
            </div>
            <div className="my-6">
              <Button
                onClick={startFight}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              >
                戦闘開始
              </Button>
            </div>
          </div>
        )}
        <div className="my-36 ml-44">{children}</div>
      </div>

      <div>
        {playersPartyStatus.rival.map((member: any, index: number) => {
          return (
            <Image
              key={index}
              src={member.imgUrl}
              className="rounded-full w-40"
            />
          )
        })}
      </div>
    </div>
  )
}
