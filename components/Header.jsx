import { Button } from "@mantine/core";
import { useState, useContext } from "react";
import { gotContext } from "../contexts/gotPoke";
import { MyParty } from "./MyParty";
import Link from "next/link";
export const Header = () => {
  const got = useContext(gotContext);
  const [isPartyVisible, setIsPartyVisivle] = useState(false);
  useContext;
  const toggleMyParty = () => {
    setIsPartyVisivle(!isPartyVisible);
  };

  return (
    <>
      <div className="flex">
        <Link href="/">
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            style={{ marginBottom: 30 }}
          >
            <a>図鑑TOPへ</a>
          </Button>
        </Link>
        <Button
          onClick={toggleMyParty}
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          style={{ marginBottom: 30 }}
        >
          手持ち
        </Button>
        <Link href="/quiz">
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            style={{ marginBottom: 30 }}
          >
            <a>クイズ</a>
          </Button>
        </Link>
        <h1 className="text-red-400 text-3xl font-bold underline">
          {got.length}匹
        </h1>
      </div>

      {isPartyVisible ? <MyParty /> : null}
    </>
  );
};
