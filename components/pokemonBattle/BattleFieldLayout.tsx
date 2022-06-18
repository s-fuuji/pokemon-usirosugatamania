import { Button, Checkbox, Image } from "@mantine/core"
import { useEffect, useState } from "react";
import { FighterOrder } from "../../pages/battle";
import { FightingPhase } from "./FightingPhase";
import { randomNumber } from "./RandomNumber";

type Props = {
    diceCount: any;
    rivalDiceCount: any;
    playersStatus: any;
}



export const BattleFieldLayout = ({ diceCount, rivalDiceCount, playersStatus }) => {


    return (
        <div className="flex justify-around">
            <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                自分のパワー{diceCount.totalDice}
            </Button>


            <div className="flex">
                <Button className="ml-48" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 35 }}>
                    プレイヤーのHP:{playersStatus.playerHp}
                </Button>
                <Button className="" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 35 }}>
                    <p>ライバルのHP:</p>
                    <p>{playersStatus.rivalHp}</p>
                </Button>
            </div>


            <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                ライバルのパワー{rivalDiceCount.totalDice}
            </Button>
        </div>
    )
}