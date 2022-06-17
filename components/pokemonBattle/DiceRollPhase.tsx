import { Button, Paper, Text } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react";
import { diceCount } from "../../pages/battle";
import { DiceRollEffect } from "./DiceRollEffect";
import { TripleDice } from "./TripleDice";
type setBoolean = Dispatch<SetStateAction<boolean>>
type setNumberArray = Dispatch<SetStateAction<number[]>>

type Props = {
    setIsStatusUpPhase: setBoolean;
    diceCount: diceCount;
    setDiceCount: setNumberArray
}


type end = setBoolean
type start = setBoolean;


export const DiceRollPhase: React.FC<Props> = ({ diceCount, setDiceCount, setIsStatusUpPhase }) => {
    const [isDicePhase, setIsDicePhase] = useState(false);

    const phaseChange = (end: end, start: start) => {
        end(false);
        start(true);
    }
    const diceEffectStart = () => {
        TripleDice(setDiceCount)
        setIsDicePhase(true);
        setIsStatusUpPhase(false)
        setTimeout(() => { phaseChange(setIsDicePhase, setIsStatusUpPhase) }, 2000)
    }


    return <div className="text-center">
        {!isDicePhase ? <div><div className="flex justify-center">
            {diceCount.threeDice.map((count: number) => {
                return <Paper shadow="xs" p="md">
                    <Text>{count}</Text>
                </Paper>
            })}
            <Paper className="ml-3" shadow="xs" p="md">
                <Text>{diceCount.totalDice}</Text>
            </Paper>
        </div>
            <Button onClick={diceEffectStart}>サイコロを振る</Button></div>
            : <div className="flex justify-center">
                <DiceRollEffect />
                <DiceRollEffect />
                <DiceRollEffect />
            </div>}
    </div>
}