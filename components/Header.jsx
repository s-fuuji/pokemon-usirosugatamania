import { Button } from "@mantine/core";
import { useState, useContext } from "react";
import { clearedQuizContext, gotContext } from "../contexts/gotPoke";
import { MyParty } from "./MyParty";
import Link from "next/link";

export const Header = () => {
  const got = useContext(gotContext);
  const clearedQuiz = useContext(clearedQuizContext);
  const [isPartyVisible, setIsPartyVisivle] = useState(false);
  useContext;
  const toggleMyParty = () => {
    setIsPartyVisivle(!isPartyVisible);
  };

  return (
    <header className="flex h-30 items-baseline bg-orange-400 ">
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
      <ul className="flex gap-3">
        <li>初代：{clearedQuiz.red}</li>
        <li>金銀：{clearedQuiz.gold}</li>
        <li>ルビサファ：{clearedQuiz.ruby}</li>
      </ul>

      <Button
        onClick={toggleMyParty}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        手持ち: <span>{got.length}</span> 匹
      </Button>

      {isPartyVisible ? <MyParty /> : null}
    </header>
  );
};
