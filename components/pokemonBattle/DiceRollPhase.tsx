import { Button, Paper, Text } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react";
import { DiceRollEffect } from "./DiceRollEffect";
import { TripleDice } from "./TripleDice";


type Props = {
    isStatusUpPhase: any;
    setIsStatusUpPhase: any;
    diceCount: any;
    setDiceCount: any;
    setRivalDiceCount: any;
}

export type setBoolean = Dispatch<SetStateAction<boolean>>

type end = setBoolean
type start = setBoolean;


export const DiceRollPhase: React.FC<Props> = ({ diceCount, setDiceCount, setRivalDiceCount, setIsStatusUpPhase, isStatusUpPhase }) => {
    const [isDiceRollPhase, setIsDiceRollPhasePhase] = useState(false);




    const phaseChange = (end: end, start: start) => {
        end(false);
        start(true);
    }
    const diceEffectStart = () => {
        TripleDice(setDiceCount);
        TripleDice(setRivalDiceCount);
        phaseChange(setIsStatusUpPhase, setIsDiceRollPhasePhase);
        setTimeout(() => { phaseChange(setIsDiceRollPhasePhase, setIsStatusUpPhase) }, 2000);
    }


    return <div className="text-center">
        {!isDiceRollPhase ? <div>
            <div className="flex justify-center">
                {diceCount.threeDice.map((count: number) => {
                    return <Paper shadow="xs" p="md">
                        <Text>{count}</Text>
                    </Paper>
                })}
                <Paper className="ml-3" shadow="xs" p="md">
                    <Text>{diceCount.totalDice}</Text>
                </Paper>
            </div>
            {!isStatusUpPhase && <Button onClick={diceEffectStart}>サイコロを振る</Button>}
        </div>
            :
            <div>
                <div className="flex justify-center">
                    <DiceRollEffect />
                    <DiceRollEffect />
                    <DiceRollEffect />
                </div>
            </div>
        }
    </div>
}