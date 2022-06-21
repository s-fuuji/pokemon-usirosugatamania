import { Button } from "@mantine/core"
import { FC } from "react";
import { DiceCount, PlayersStatus } from "../types/battlePageTypes";

type Props = {
    diceCount: DiceCount;
    rivalDiceCount: DiceCount;
    playersStatus: PlayersStatus;
};

export const BattleFieldLayout: FC<Props> = ({ diceCount, rivalDiceCount, playersStatus }) => {


    return (
        <div className="flex justify-around">
            <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                自分のパワー{diceCount.totalDice}
            </Button>


            <div className="flex">
                <Button className="ml-14" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 35 }}>
                    プレイヤーのHP:{playersStatus.playerHp}
                </Button>
                <Button className="" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 35 }}>
                    <p>ライバルのHP:{playersStatus.rivalHp}</p>
                </Button>
            </div>


            <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                ライバルのパワー{rivalDiceCount.totalDice}
            </Button>
        </div>
    )
}