import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BattleFieldLayout } from "../components/pokemonBattle/BattleFieldLayout";
import { DiceRollPhase } from "../components/pokemonBattle/DiceRollPhase";
import { EndPhase } from "../components/pokemonBattle/EndPhase";
import { FightingPhase } from "../components/pokemonBattle/FightingPhase";
import { randomNumber } from "../components/pokemonBattle/RandomNumber";
import { SelectPokePhase } from "../components/pokemonBattle/SelectPokePhase";
import { StatusUpPhase } from "../components/pokemonBattle/StatusUpPhase";
import { DiceCount, MyStaticParty, PartyStatus, PlayersStatus } from "../components/types/battlePage";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";



const Battle: NextPage = () => {
    const [isSelectPokePhase, setIsSelectPokePhase] = useState<boolean>(true);
    const [IsBattlePhase, setIsBattlePhase] = useState<boolean>(false);
    const [isDiceRollPhase, setIsDiceRollPhase] = useState<boolean>(false);
    const [isStatusUpPhase, setIsStatusUpPhase] = useState<boolean>(false);
    const [isFightPhase, setIsFightPhase] = useState<boolean>(false);
    const [isEndPhase, setIsEndPhase] = useState<boolean>(false);
    const [playersStatus, setPlayersStatus] = useState<PlayersStatus>({
        playerHp: 50, rivalHp: 50
    });
    const [rivalParty, setRivalParty] = useState<number[]>(randomNumber(0, 6, 6));
    const [diceCount, setDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 });
    const [rivalDiceCount, setRivalDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 });
    const got: number[] = useSelector((state: storeState) => state.got);
    const { pokemonList, pokemonListError } = usePokeSWR();
    const [partyStatus, setPartyStatus] = useState<PartyStatus>({
        player: [],
        rival: []
    });
    const [myBattleParty, setMyBattleParty] = useState<MyStaticParty>([]);

    useEffect(() => {
        const newMyBattleParty = got.map((got, index) => {
            return ({
                id: index,
                pokeIndex: got,
                checked: false,
            });
        });
        setMyBattleParty(newMyBattleParty);
    }, []);

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