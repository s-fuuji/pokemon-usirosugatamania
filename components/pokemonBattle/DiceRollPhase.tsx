import { Button, Paper, Text } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react";
import { DiceRollEffect } from "./DiceRollEffect";
import { PhaseChange } from "./PhaseChange";
import { TripleDice } from "./TripleDice";


type Props = {
    isStatusUpPhase: any;
    setIsStatusUpPhase: any;
    diceCount: any;
    setDiceCount: any;
    setRivalDiceCount: any;
    isDiceRollPhase: any;
    setIsDiceRollPhase: any;
}


export const DiceRollPhase: React.FC<Props> = ({
    diceCount,
    setDiceCount,
    setRivalDiceCount,
    setIsStatusUpPhase,
    isDiceRollPhase,
    setIsDiceRollPhase }) => {

    const [showDiceRollEffect, setShowDiceRollEffect] = useState(false)
    const startDiceEffect = () => {
        TripleDice(setDiceCount);
        TripleDice(setRivalDiceCount);
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
                {diceCount.threeDice.map((count: number, index: number) => {
                    return <Paper key={index} shadow="xs" p="md">
                        <Text>{count}</Text>
                    </Paper>
                })}
                <Paper className="ml-3" shadow="xs" p="md">
                    <Text>{diceCount.totalDice}</Text>
                </Paper>
            </div>
        }
        {isDiceRollPhase && <Button onClick={startDiceEffect}>サイコロを振る</Button>}
    </div>
};