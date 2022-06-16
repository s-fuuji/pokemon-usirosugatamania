import { Button, Divider, Paper, Text } from "@mantine/core"
import { useState } from "react";
import { DiceRollEffect } from "./DiceRollEffect";
import { tripleDice } from "./TripleDice";

export const DiceRollPhase = () => {
    const [isDicePhase, setIsDicePhase] = useState(false);
    const [isStatusUpPhase, setIsStatusUpPhase] = useState(false);
    const [diceCount, setDiceCount] = useState([0, 0, 0]);
    const phaseChange = (end, start) => {
        end(false)
        start(true)
    }
    const diceEffectStart = () => {
        tripleDice(setDiceCount)
        setIsDicePhase(true);
        setIsStatusUpPhase(false)
        setTimeout(() => { phaseChange(setIsDicePhase, setIsStatusUpPhase) }, 2000)
    }


    return <div className="text-center">

        {!isStatusUpPhase ? null : <div className="flex justify-center">
            {diceCount.map((count: number) => {
                return <Paper shadow="xs" p="md">
                    <Text>{count}</Text>
                </Paper>
            })}
        </div>}
        {!isDicePhase ?
            <Button onClick={diceEffectStart}>サイコロを振る</Button>
            : <div className="flex justify-center">
                <DiceRollEffect />
                <DiceRollEffect />
                <DiceRollEffect />
            </div>}

    </div>
}