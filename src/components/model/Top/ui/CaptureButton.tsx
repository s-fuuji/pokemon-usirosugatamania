import { Button } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { get, goodbye } from '../../../../slicer/gotPokemonSlicer'
import React, { FC } from 'react'
import { storeState } from '../../../../slicer/store'

type Props = {
  index: number
}

export const CaptureButton: FC<Props> = ({ index }) => {
  const capturedPoke = useSelector((state: storeState) => state.capturedPoke)
  const dispatch = useDispatch()

  const capturePoke = (index: number) => {
    dispatch(get(index))
  }

  const releasePoke = (index: number) => {
    dispatch(goodbye(index))
  }

  return !capturedPoke.includes(index) ? (
    <Button
      className="bg-amber-900 hover:bg-amber-800"
      value={index}
      onClick={() => capturePoke(index)}
      variant="light"
      fullWidth
      style={{ marginTop: 14 }}
    >
      手持ちに加える
    </Button>
  ) : (
    <Button
      className="bg-amber-900 hover:bg-amber-800"
      value={index}
      onClick={() => releasePoke(index)}
      variant="light"
      fullWidth
      style={{ marginTop: 14 }}
    >
      手持ちから外す
    </Button>
  )
}
