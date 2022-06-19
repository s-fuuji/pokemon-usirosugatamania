import { Button, Checkbox, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BattleFieldLayout } from "../components/pokemonBattle/BattleFieldLayout";
import { DiceRollPhase } from "../components/pokemonBattle/DiceRollPhase";
import { EndPhase } from "../components/pokemonBattle/EndPhase";
import { FightingPhase } from "../components/pokemonBattle/FightingPhase";
import { PhaseChange } from "../components/pokemonBattle/PhaseChange";
import { randomNumber } from "../components/pokemonBattle/RandomNumber";
import { SelectPokePhase } from "../components/pokemonBattle/SelectPokePhase";
import { StatusUpPhase } from "../components/pokemonBattle/StatusUpPhase";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

export type DiceCount = {
    threeDice: number[];
    totalDice: number;
};

export type FighterOrder = {
    id: number;
    order: number;
    checked: boolean
};

const Battle: NextPage = () => {
    const [rivalParty, setRivalParty] = useState(randomNumber(0, 6, 6))
    const [isStatusUpPhase, setIsStatusUpPhase] = useState(false);
    const [isDiceRollPhase, setIsDiceRollPhase] = useState(false);
    const [isBattlePhase, setIsBattlePhase] = useState(false);
    const [isFightPhase, setIsFightPhase] = useState(false);
    const [isEndPhase, setIsEndPhase] = useState(false);
    const [playersStatus, setPlayersStatus] = useState({
        playerHp: 50, rivalHp: 50
    });
    const [isSelectPokePhase, setIsSelectPokePhase] = useState(true);
    const [diceCount, setDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 });
    const [rivalDiceCount, setRivalDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 });
    const got = useSelector((state: storeState) => state.got);
    const { pokemonList, pokemonListError } = usePokeSWR();
    const [partyStatus, setPartyStatus] = useState();
    const [myBattleParty, setMyBattleParty] = useState<FighterOrder[]>(
        got.map((got: any, index: number) => {
            return ({
                id: index,
                pokeIndex: got,
                checked: false,
            });
        })
    );

    return (
        <div>
            {!isEndPhase ? isSelectPokePhase ?
                <SelectPokePhase
                    rivalParty={rivalParty}
                    pokemonList={pokemonList}
                    myBattleParty={myBattleParty}
                    setIsSelectPokePhase={setIsSelectPokePhase}
                    setIsDiceRollPhase={setIsDiceRollPhase}
                    setPartyStatus={setPartyStatus}
                    setMyBattleParty={setMyBattleParty}
                />
                :
                <div>
                    <BattleFieldLayout
                        playersStatus={playersStatus}
                        diceCount={diceCount}
                        rivalDiceCount={rivalDiceCount}
                    />

                    <StatusUpPhase
                        diceCount={diceCount}
                        setDiceCount={setDiceCount}
                        partyStatus={partyStatus}
                        isStatusUpPhase={isStatusUpPhase}
                        setIsStatusUpPhase={setIsStatusUpPhase}
                        setPartyStatus={setPartyStatus}
                        setIsBattlePhase={setIsBattlePhase}
                        rivalDiceCount={rivalDiceCount}
                        setIsFightPhase={setIsFightPhase}
                    >
                        {isFightPhase && <FightingPhase
                            playersStatus={playersStatus}
                            setPlayersStatus={setPlayersStatus}
                            partyStatus={partyStatus}
                            setIsFightPhase={setIsFightPhase}
                            setIsDiceRollPhase={setIsDiceRollPhase}
                            setIsEndPhase={setIsEndPhase}
                        />}
                    </StatusUpPhase>

                    <DiceRollPhase
                        diceCount={diceCount}
                        setDiceCount={setDiceCount}
                        setRivalDiceCount={setRivalDiceCount}
                        isStatusUpPhase={isStatusUpPhase}
                        setIsStatusUpPhase={setIsStatusUpPhase}
                        isDiceRollPhase={isDiceRollPhase}
                        setIsDiceRollPhase={setIsDiceRollPhase}
                    />
                </div>
                : <EndPhase playersStatus={playersStatus} />}
        </div>
    )
}

export default Battle