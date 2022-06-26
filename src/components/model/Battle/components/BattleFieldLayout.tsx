import { Button } from '@mantine/core'
import { FC } from 'react'
import { DiceCount, PlayersStatus } from '../../../types/battlePageTypes'

type Props = {
  diceCountArray: DiceCount
  rivalDiceCount: DiceCount
  playersHitPoint: PlayersStatus
}

export const BattleFieldLayout: FC<Props> = ({
  diceCountArray,
  rivalDiceCount,
  playersHitPoint,
}) => {
  return (
    <div className="flex justify-around">
      <Button
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
      >
        自分のパワー{diceCountArray.totalDice}
      </Button>

      <div className="flex">
        <Button
          className="ml-14"
          variant="gradient"
          gradient={{ from: 'orange', to: 'red', deg: 35 }}
        >
          プレイヤーのHP:{playersHitPoint.playerHp}
        </Button>
        <Button
          className=""
          variant="gradient"
          gradient={{ from: 'orange', to: 'red', deg: 35 }}
        >
          <p>ライバルのHP:{playersHitPoint.rivalHp}</p>
        </Button>
      </div>

      <Button
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
      >
        ライバルのパワー{rivalDiceCount.totalDice}
      </Button>
    </div>
  )
}
