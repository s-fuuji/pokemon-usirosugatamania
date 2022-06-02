import { Image } from "@mantine/core";
import Link from "next/link";

export const PartyHolder = ({ imgurl, link }) => {
  return (
    <li>
      <Link href="link">
        <a>
          <Image className="rounded-full w-10" src={imgurl} alt="読み込み中" />
        </a>
      </Link>
    </li>
  );
};
