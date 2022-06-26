import { Button } from '@mantine/core'
import { FC, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import React from 'react'
import { storeState } from '../../slicer/store'
import { MyParty } from '../model/Header/components/MyParty'

export const Header: FC = () => {
  const capturedPoke = useSelector((state: storeState) => state.capturedPoke)
  const triedQuizResulltData = useSelector(
    (state: storeState) => state.triedQuizResulltData
  )
  const [showParty, setShowParty] = useState<boolean>(false)
  const toggleShowParty = (): void => {
    setShowParty(!showParty)
  }

  return (
    <header className="flex fixed top-0 left-0 z-10 h-16 w-full bg-dark-orange px-10 text-white">
      <div className="flex items-baseline ">
        <Link href="/">
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            style={{ marginBottom: 30 }}
          >
            <a>図鑑TOPへ</a>
          </Button>
        </Link>
        <Link href="/quiz">
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            style={{ marginBottom: 30 }}
          >
            <a>クイズ</a>
          </Button>
        </Link>
        <Link href="/battle">
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            style={{ marginBottom: 30 }}
          >
            <a>ポケモンバトル</a>
          </Button>
        </Link>
        <ul className="flex gap-3 ">
          <li>クイズ正解数：{triedQuizResulltData.red}</li>
        </ul>

        <Button
          className="ml-8"
          onClick={toggleShowParty}
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
          style={{ marginBottom: 30 }}
        >
          手持ちのポケモンを見る: <span>{capturedPoke.length}</span> 匹
        </Button>
      </div>

      <ul className="flex gap-3 items-center">
        {showParty ? <MyParty /> : null}
      </ul>
    </header>
  )
}
