import { Card, Image } from '@mantine/core'
import React, { FC } from 'react'

type Props = {
  imgUrl: string | undefined
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export const QuizCard: FC<Props> = ({ imgUrl, onClick }) => {
  return (
    <div>
      <Card
        className="bg-red-600 w-96 rounded-2xl border-white"
        shadow="sm"
        p="lg"
        onClick={onClick}
        withBorder
      >
        <Image
          className="rounded-full w-48 mx-auto mb-5 bg-red-100"
          src={imgUrl}
          height={200}
          width={200}
          alt="読み込み中"
        />
      </Card>
    </div>
  )
}
