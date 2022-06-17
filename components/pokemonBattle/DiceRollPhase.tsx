import { Button, Paper, Text } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react";
import { DiceRollEffect } from "./DiceRollEffect";
import { tripleDice } from "./TripleDice";

type Props = {
    setIsStatusUpPhase: Dispatch<SetStateAction<boolean>>
}


type end = Dispatch<SetStateAction<boolean>>;
type start = Dispatch<SetStateAction<boolean>>;


export const DiceRollPhase: React.FC<Props> = ({ setIsStatusUpPhase }) => {
    const [isDicePhase, setIsDicePhase] = useState(false);
    const [diceCount, setDiceCount] = useState([0, 0, 0]);
    const phaseChange = (end: end, start: start) => {
        end(false);
        start(true);
    }
    const diceEffectStart = () => {
        tripleDice(setDiceCount)
        setIsDicePhase(true);
        setIsStatusUpPhase(false)
        setTimeout(() => { phaseChange(setIsDicePhase, setIsStatusUpPhase) }, 2000)
    }


    return <div className="text-center">
        {!isDicePhase ? <div><div className="flex justify-center">
            {diceCount.map((count: number) => {
                return <Paper shadow="xs" p="md">
                    <Text>{count}</Text>
                </Paper>
            })}
        </div>
            <Button onClick={diceEffectStart}>サイコロを振る</Button></div>
            : <div className="flex justify-center">
                <DiceRollEffect />
                <DiceRollEffect />
                <DiceRollEffect />
            </div>}
    </div>
}