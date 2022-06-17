import { Button, Checkbox, Divider, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DiceRollPhase } from "../components/pokemonBattle/DiceRollPhase";
import { randomNumber } from "../components/pokemonBattle/RandomNumber";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

const Battle: NextPage = () => {
    const [rivalParty, setRivalParty] = useState(randomNumber(0, 6, 6))
    const [isStatusUpPhase, setIsStatusUpPhase] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isBattle, setIsBattle] = useState(false)
    const got = useSelector((state: storeState) => state.got)
    const { pokemonList, pokemonListError } = usePokeSWR();
    const [partyStatus, setPartyStatus] = useState<any>()
    const [myBattleParty, setMyBattleParty] = useState(
        got.map((got: any, index: number) => {
            return ({
                "id": index + 1,
                pokeIndex: got,
                checked: false,
            })
        })
    )
    const [playerStatus, setPlayerStatus] = useState([
        { hp: 50, timeLiset: 3 },
        { hp: 50, timeLiset: 3 }
    ])

    console.log(myBattleParty);


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
        const checkedMyPokemon = myBattleParty.filter(
            member => member.checked
        )
        const rivalBattleParty = randomNumber(0, 6, 3);
        const newPartyStatus = {
            "player": checkedMyPokemon.map((member, index) => { return { id: index, "imgUrl": pokemonList[member.pokeIndex]?.sprites.back_default, "power": 10 } }),
            "rival": rivalBattleParty.map((member, index) => { return { id: index, "imgUrl": pokemonList[member]?.sprites.back_default, "power": 10 } })
        }
        setPartyStatus(newPartyStatus);
        setIsBattle(true)
    }

    const selectFighter = () => {

    }



    const powerUp = (powerUpIndex) => {

        const newPartyStatus = {
            ...partyStatus, "player": [...partyStatus.player, {
                ...partyStatus.player[powerUpIndex],
                "power": partyStatus.player[powerUpIndex].power + 1
            }]
        }
        setPartyStatus(newPartyStatus)
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
                                <Button onClick={() => powerUp(index)} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                    test
                                </Button>
                                <div>{member.power}</div>
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

            <DiceRollPhase setIsStatusUpPhase={setIsStatusUpPhase} />
        </div>
    )
}

export default Battle