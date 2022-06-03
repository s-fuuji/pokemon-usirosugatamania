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
    <header className="flex fixed z-10 h-16 w-full bg-orange-400  ">
      <div className="flex items-baseline ">
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
          className="ml-8"
          onClick={toggleMyParty}
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          style={{ marginBottom: 30 }}
        >
          手持ち: <span>{got.length}</span> 匹
        </Button>
      </div>

      <ul className="flex gap-3 items-center">
        {isPartyVisible ? <MyParty /> : null}
      </ul>
    </header>
  );
};
