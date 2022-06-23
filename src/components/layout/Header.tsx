import { Button } from "@mantine/core";
import { FC, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MyParty } from "../party/MyParty";
import React from 'react';
import { storeState } from "../../slicer/store";

export const Header: FC = () => {
  const capturedPoke = useSelector((state: storeState) => state.capturedPoke);
  const triedQuizData = useSelector((state: storeState) => state.triedQuizData);
  const [showParty, setShowParty] = useState<boolean>(false);
  const toggleMyParty = (): void => {
    setShowParty(!showParty);
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
        <Link href="/battle">
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            style={{ marginBottom: 30 }}
          >
            <a>ポケモンバトル</a>
          </Button>
        </Link>
        <ul className="flex gap-3 ">
          <li>初代：{triedQuizData.red}</li>
          <li>金銀：{triedQuizData.gold}</li>
          <li>ルビサファ：{triedQuizData.ruby}</li>
        </ul>

        <Button
          className="ml-8"
          onClick={toggleMyParty}
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          style={{ marginBottom: 30 }}
        >
          手持ち: <span>{capturedPoke.length}</span> 匹
        </Button>
      </div>

      <ul className="flex gap-3 items-center">
        {showParty ? <MyParty /> : null}
      </ul>
    </header>
  );
};
