import { Button, Paper, Text } from "@mantine/core";
import { useState } from "react";
import { DiceRollEffect } from "./DiceRollEffect";
import { PhaseChange } from "./PhaseChange";
import { RollThreeDice } from "./rollThreeDice";

type Props = {
    isStatusUpPhase: any;
    setIsStatusUpPhase: any;
    diceCountArray: any;
    setDiceCountArray: any;
    setRivalDiceCount: any;
    isDiceRollPhase: any;
    setIsDiceRollPhase: any;
};

export const DiceRollPhase: React.FC<Props> = ({
    diceCountArray,
    setDiceCountArray,
    setRivalDiceCount,
    setIsStatusUpPhase,
    isDiceRollPhase,
    setIsDiceRollPhase }) => {

    const [showDiceRollEffect, setShowDiceRollEffect] = useState(false)
    const startDiceEffect = () => {
        RollThreeDice(setDiceCountArray);
        RollThreeDice(setRivalDiceCount);
        PhaseChange(setIsDiceRollPhase, setShowDiceRollEffect);
        setTimeout(() => { PhaseChange(setShowDiceRollEffect, setIsStatusUpPhase) }, 1000);
    }


    return <div className="text-center">
        {showDiceRollEffect ?
            <div className="flex justify-center">
                <DiceRollEffect />
                <DiceRollEffect />
                <DiceRollEffect />
                <div className="ml-3" >
                    <DiceRollEffect />
                </div>
            </div>
            :
            <div className="flex justify-center">
                {diceCountArray.threeDice.map((count: number, index: number) => {
                    return <Paper key={index} shadow="xs" p="md">
                        <Text>{count}</Text>
                    </Paper>
                })}
                <Paper className="ml-3" shadow="xs" p="md">
                    <Text>{diceCountArray.totalDice}</Text>
                </Paper>
            </div>
        }
        {isDiceRollPhase && <Button onClick={startDiceEffect}>サイコロを振る</Button>}
    </div>
};