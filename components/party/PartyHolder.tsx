import { Image } from "@mantine/core";
import Link from "next/link";
import React from 'react'

type Props = { imgUrl: string | undefined, link: string }

export const PartyHolder: React.FC<Props> = ({ imgUrl, link }) => {
  return (
    <li>
      <Link href={link}>
        <a>
          <Image key={imgUrl} className="rounded-full w-10" src={imgUrl} alt="読み込み中" />
        </a>
      </Link>
    </li>
  );
};
