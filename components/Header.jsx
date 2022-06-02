import { Button } from "@mantine/core";
import { useState } from "react";
import { MyParty } from "./MyParty";
import Link from "next/link";
import { useSelector } from "react-redux";

export const Header = () => {
  const got = useSelector((state) => state.got);
  const triedQuiz = useSelector((state) => state.triedQuiz);
  const [isPartyVisible, setIsPartyVisivle] = useState(false);
  const toggleMyParty = () => {
    setIsPartyVisivle(!isPartyVisible);
  };

  return (
    <header className="flex h-16 w-full items-baseline bg-orange-400 fixed z-10">
      <Link href="/">
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          style={{ marginBottom: 30 }}
        >
          <a>図鑑TOPへ</a>
        </Button>
      </Link>
      <Link href="/quiz">
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          style={{ marginBottom: 30 }}
        >
          <a>クイズ</a>
        </Button>
      </Link>
      <ul className="flex gap-3 ">
        <li>初代：{triedQuiz.red}</li>
        <li>金銀：{triedQuiz.gold}</li>
        <li>ルビサファ：{triedQuiz.ruby}</li>
      </ul>

      <Button
        onClick={toggleMyParty}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        手持ち: <span>{got.length}</span> 匹
      </Button>

      {isPartyVisible ? (
        <ul className="flex gap-3 ">
          <MyParty />
        </ul>
      ) : null}
    </header>
  );
};
