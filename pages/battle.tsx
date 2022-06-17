import { Button, Checkbox, Divider, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DiceRollPhase } from "../components/pokemonBattle/DiceRollPhase";
import { randomNumber } from "../components/pokemonBattle/RandomNumber";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

export type diceCount = {
    threeDice: number[];
    totalDice: number;
}


type PartyStatus = {
    "player": [{ id: number; "imgUrl": string | undefined; "power": number }],
    "rival": [{ id: number; "imgUrl": string | undefined; "power": number }]
}

const Battle: NextPage = () => {
    const [rivalParty, setRivalParty] = useState(randomNumber(0, 6, 6))
    const [isStatusUpPhase, setIsStatusUpPhase] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isBattle, setIsBattle] = useState(false)
    const [diceCount, setDiceCount] = useState<diceCount>({ threeDice: [0, 0, 0], totalDice: 0 });
    const got = useSelector((state: storeState) => state.got)
    const { pokemonList, pokemonListError } = usePokeSWR();
    const [partyStatus, setPartyStatus] = useState()
    const [myBattleParty, setMyBattleParty] = useState(
        got.map((got: any, index: number) => {
            return ({
                "id": index,
                pokeIndex: got,
                checked: false,
            })
        })
    )
    const [playerStatus, setPlayerStatus] = useState([
        { hp: 50, timeLiset: 3 },
        { hp: 50, timeLiset: 3 }
    ])




    const pokemonBattle = () => {

    }

    useEffect(() => {
        myBattleParty.filter(member => member.checked).length === 3 ?
            setIsDisabled(true) : setIsDisabled(false)
    }, [myBattleParty])


    const myPartyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const toggleParty = myBattleParty.map((member: any, i: number) => {
            return i !== index ? member : { ...member, checked: !member.checked }
        }
        )
        setMyBattleParty(toggleParty)
    }
    /*ここまでが自分の手持ちの選択をする処理 */

    const battleStart = () => {
        const checkedMyParty = myBattleParty.filter(
            member => member.checked
        )
        const rivalBattleParty = randomNumber(0, 6, 3);
        const newPartyStatus = {
            "player": checkedMyParty.map((member, index) => { return { id: index, "imgUrl": pokemonList[member.pokeIndex]?.sprites.back_default, "power": 10 } }),
            "rival": rivalBattleParty.map((member, index) => { return { id: index, "imgUrl": pokemonList[member]?.sprites.back_default, "power": 10 } })
        }
        setPartyStatus(newPartyStatus);
        setIsBattle(true)
    }

    const selectFighter = () => {

    }



    const powerUp = (powerUpIndex: number, up?: string) => {

        if (up && diceCount.totalDice > 0 || !up && partyStatus.player[powerUpIndex].power > 0) {
            const powerUpPokemon = partyStatus.player.map(member => {
                return member.id === powerUpIndex ? { ...member, "power": member.power + (up ? +1 : -1) } : member;
            });

            const newPartyStatus = {
                ...partyStatus, "player": powerUpPokemon
            };
            setDiceCount({ ...diceCount, totalDice: diceCount.totalDice + (up ? -1 : 1) })
            setPartyStatus(newPartyStatus)
            console.log(diceCount);

        } else {
            console.log("null");
        }
    }






    return (
        <div >
            {!isBattle ? <div className="text-center">
                <div className="flex justify-center">
                    {rivalParty?.map((rivalPokeIndex: any) => {
                        return <Image key={Math.random()}
                            src={pokemonList ? pokemonList[rivalPokeIndex].sprites.back_default : null}
                            className="rounded-full w-28" />
                    })}
                </div>
                <p className="text-red-500 text-4xl">VS</p>

                <div className="flex justify-center">
                    {pokemonList ? got?.map((gotPokeIndex: number, index: number) => {
                        return <label htmlFor={`id_${index}`} key={`key_${index}`} className="flex-col items-center">
                            <Image src={pokemonList[gotPokeIndex]?.sprites.back_default} className="rounded-full w-28" />
                            <Checkbox
                                id={`id_${index}`}
                                disabled={!myBattleParty[index].checked ? isDisabled : false}
                                onChange={(e) => myPartyChange(e, index)}
                            />
                        </label>
                    }) : null}
                </div>
            </div>
                :
                <div className="flex justify-around">
                    <div>
                        {partyStatus.player.map((member: any, index: number) => {
                            return <div className="flex items-center">
                                <Button onClick={() => powerUp(index, "up")} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                    +
                                </Button>
                                <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                    {member.power}
                                </Button>
                                <Button onClick={() => powerUp(index)} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                    -
                                </Button>

                                <label htmlFor={`battleId_${index}`} key={`battleKey_${index}`} >
                                    <Image src={member.imgUrl} className="rounded-full w-44" />
                                    <Checkbox
                                        size="xl"
                                        id={`battleId_${index}`}
                                        disabled={false}
                                        onChange={selectFighter}
                                    />
                                </label>
                            </div>
                        })}
                    </div>

                    <div>
                        {partyStatus.rival.map((member: any, index: number) => {
                            return <Image src={member.imgUrl} className="rounded-full w-44" />
                        })}
                    </div>
                </div>
            }

            <div className="text-center">
                {!isDisabled ?
                    <Button
                        onClick={pokemonBattle}
                        variant="gradient"
                        gradient={{ from: "orange", to: "red" }}
                        style={{ marginBottom: 30 }}
                    >
                        バトルの準備
                    </Button> : <Button
                        onClick={battleStart}
                        variant="gradient"
                        gradient={{ from: "orange", to: "red" }}
                        style={{ marginBottom: 30 }}
                    >
                        バトル開始
                    </Button>}
            </div>

            <DiceRollPhase diceCount={diceCount} setDiceCount={setDiceCount} setIsStatusUpPhase={setIsStatusUpPhase} />
        </div>
    )
}

export default Battle