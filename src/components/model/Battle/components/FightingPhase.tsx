import { Button, Image } from '@mantine/core'
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Party,
  PartyStatus,
  PlayersStatus,
} from '../../../types/battlePageTypes'
import { PhaseChange } from '../functional/PhaseChange'

type Props = {
  setPlayersHitPoint: Dispatch<SetStateAction<PlayersStatus>>
  setIsFightPhase: Dispatch<SetStateAction<boolean>>
  setIsDiceRollPhase: Dispatch<SetStateAction<boolean>>
  setIsEndPhase: Dispatch<SetStateAction<boolean>>
  playersPartyStatus: PartyStatus
  playersHitPoint: PlayersStatus
}

export const FightingPhase: FC<Props> = ({
  playersPartyStatus,
  playersHitPoint,
  setPlayersHitPoint,
  setIsFightPhase,
  setIsDiceRollPhase,
  setIsEndPhase,
}) => {
  const [turn, setTurn] = useState<number>(0)

  const sortedMyParty = [...playersPartyStatus.player].sort(
    (fighterA, fighterB) => {
      if (fighterA.order < fighterB.order) return -1
      if (fighterA.order > fighterB.order) return 1
      return 0
    }
  )

  const sortedRivalParty = [...playersPartyStatus.rival].sort(
    (fighterA, fighterB) => {
      if (fighterA.order < fighterB.order) return -1
      if (fighterA.order > fighterB.order) return 1
      return 0
    }
  )

  const checkedDamage = sortedMyParty.map((prev, index) => {
    return prev.power - sortedRivalParty[index].power
  })

  const reduceHitPoint = (i: number) => {
    setTurn(i)
    setPlayersHitPoint((prevPlayersStatus) => {
      return checkedDamage[i] >= 0
        ? {
            playerHp: prevPlayersStatus.playerHp,
            rivalHp: prevPlayersStatus.rivalHp - checkedDamage[i],
          }
        : {
            playerHp: prevPlayersStatus.playerHp + checkedDamage[i],
            rivalHp: prevPlayersStatus.rivalHp,
          }
    })
  }

  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  const asyncOrderCount = async (): Promise<void> => {
    for (let i = 0; i < 3; i++) {
      reduceHitPoint(i)
      await sleep(2000)
    }
    PhaseChange(setIsFightPhase, setIsDiceRollPhase)
  }

  useEffect(() => {
    if (playersHitPoint.playerHp <= 0 || playersHitPoint.rivalHp <= 0) {
      setTimeout(() => {
        PhaseChange(setIsFightPhase, setIsEndPhase)
      }, 1500)
    }
  }, [playersHitPoint])

  const effectUsedRef = useRef(false)

  useEffect(() => {
    if (!effectUsedRef.current) {
      asyncOrderCount()
      effectUsedRef.current = true
    }
  }, [])

  return (
    <div>
      {turn === 0 && (
        <div className="flex items-center">
          <Image src={sortedMyParty[0].imgUrl} className="rounded-full w-44" />
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          >
            {checkedDamage[0] >= 0
              ? `相手に-${checkedDamage[0]}ダメージ！`
              : `自分に${checkedDamage[0]}ダメージ！`}
          </Button>
          <Image
            src={sortedRivalParty[0].imgUrl}
            className="rounded-full w-44"
          />
        </div>
      )}
      {turn === 1 && (
        <div className="flex items-center">
          <Image src={sortedMyParty[1].imgUrl} className="rounded-full w-44" />
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          >
            {checkedDamage[1] >= 0
              ? `相手に-${checkedDamage[1]}ダメージ！`
              : `自分に${checkedDamage[1]}ダメージ！`}
          </Button>
          <Image
            src={sortedRivalParty[1].imgUrl}
            className="rounded-full w-44"
          />
        </div>
      )}
      {turn === 2 && (
        <div className="flex items-center">
          <Image src={sortedMyParty[2].imgUrl} className="rounded-full w-44" />
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          >
            {checkedDamage[2] >= 0
              ? `相手に-${checkedDamage[2]}ダメージ！`
              : `自分に${checkedDamage[2]}ダメージ！`}
          </Button>
          <Image
            src={sortedRivalParty[2].imgUrl}
            className="rounded-full w-44"
          />
        </div>
      )}
    </div>
  )
}
