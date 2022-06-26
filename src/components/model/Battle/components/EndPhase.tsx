import { Button } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { PlayersStatus } from '../../../types/battlePageTypes'

type Props = {
  playersHitPoint: PlayersStatus
}

export const EndPhase: FC<Props> = ({ playersHitPoint }) => {
  const [isWin, setIsWin] = useState(false)
  useEffect(() => {
    playersHitPoint.playerHp >= playersHitPoint.rivalHp && setIsWin(true)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <Button
        className="h-96 w-96"
        variant="gradient"
        gradient={{ from: 'orange', to: 'red', deg: 35 }}
      >
        <p className="text-8xl">{isWin ? '勝利！' : '敗北...'}</p>
      </Button>
    </div>
  )
}
