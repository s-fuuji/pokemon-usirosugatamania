import { Button, Checkbox, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BattleField, BattleFieldLayout } from "../components/pokemonBattle/BattleFieldLayout";
import { DiceRollPhase } from "../components/pokemonBattle/DiceRollPhase";
import { FightingPhase } from "../components/pokemonBattle/FightingPhase";
import { randomNumber } from "../components/pokemonBattle/RandomNumber";
import { SelectPokePhase } from "../components/pokemonBattle/SelectPokePhase";
import { StatusUpPhase } from "../components/pokemonBattle/StatusUpPhase";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

export type DiceCount = {
    threeDice: number[];
    totalDice: number;
}

export type FighterOrder = {
    id: number;
    order: number;
    checked: boolean
}

const Battle: NextPage = () => {
    const [rivalParty, setRivalParty] = useState(randomNumber(0, 6, 6))
    const [isStatusUpPhase, setIsStatusUpPhase] = useState(false)
    const [isBattlePhase, setIsBattlePhase] = useState(false)
    const [fight, setFight] = useState(false)
    const [playersStatus, setPlayersStatus] = useState({
        playerHp: 50, rivalHp: 50
    })
    const [isBattle, setIsBattle] = useState(false)
    const [diceCount, setDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 });
    const [rivalDiceCount, setRivalDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 })
    const got = useSelector((state: storeState) => state.got)
    const { pokemonList, pokemonListError } = usePokeSWR();
    const [partyStatus, setPartyStatus] = useState()
    const [myBattleParty, setMyBattleParty] = useState<FighterOrder[]>(
        got.map((got: any, index: number) => {
            return ({
                id: index,
                pokeIndex: got,
                checked: false,
            })
        })
    )

    const [fighterOrder, setFighterOrder] = useState(
        [...Array(3)].map((notUse, index) => { return { id: index, order: 0, checked: false } })

    )

    return (
        <div >
            {!isBattle ?
                <SelectPokePhase
                    rivalParty={rivalParty}
                    pokemonList={pokemonList}
                    myBattleParty={myBattleParty}
                    setIsBattle={setIsBattle}
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
                        setPartyStatus={setPartyStatus}
                        setIsBattlePhase={setIsBattlePhase}
                        rivalDiceCount={rivalDiceCount}
                        setFight={setFight}
                    >
                        {fight && <FightingPhase playersStatus={playersStatus} setPlayersStatus={setPlayersStatus} partyStatus={partyStatus} />}
                    </StatusUpPhase>

                    <DiceRollPhase
                        diceCount={diceCount}
                        setDiceCount={setDiceCount}
                        setRivalDiceCount={setRivalDiceCount}
                        isStatusUpPhase={isStatusUpPhase}
                        setIsStatusUpPhase={setIsStatusUpPhase} />
                </div>
            }
        </div>
    )
}

export default Battle