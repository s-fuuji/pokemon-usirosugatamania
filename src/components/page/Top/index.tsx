import { Button, Input } from '@mantine/core'
import { useState } from 'react'
import { NextPage } from 'next/types'
import React from 'react'
import { Pokedex } from '../../model/Top/components/Pokedex'

export const Top: NextPage = () => {
  const [showAllPoke, setShowAllPoke] = useState(true)
  const [serchingPokeName, setSerchingPokeName] = useState('')
  const toggleShowAllPoke = () => {
    setShowAllPoke(!showAllPoke)
  }

  return (
    <div>
      <div className="flex">
        <Button
          onClick={toggleShowAllPoke}
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
          style={{ marginBottom: 30 }}
        >
          {showAllPoke
            ? 'オスとメスでうしろ姿が違うポケモンを表示'
            : '全てのポケモンを表示'}
        </Button>
        <Input
          className="ml-5"
          variant="default"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSerchingPokeName(e.target.value)
          }
          placeholder="好きなポケモンを検索"
        />
      </div>
      <Pokedex serchingPokeName={serchingPokeName} showAllPoke={showAllPoke} />
    </div>
  )
}
