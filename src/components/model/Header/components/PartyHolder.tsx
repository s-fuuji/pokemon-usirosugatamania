import { Image } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  imgUrl: string
  link: string
}

export const PartyHolder: FC<Props> = ({ imgUrl, link }) => {
  return (
    <li>
      <Link href={link}>
        <a>
          <Image
            key={imgUrl}
            className="rounded-full w-10"
            src={imgUrl}
            alt="読み込み中"
          />
        </a>
      </Link>
    </li>
  )
}
