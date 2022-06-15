import { Button, Checkbox, Divider, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { randomNumber } from "../components/pokemonBattle/RandomNumber";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

const Battle: NextPage = () => {
    const [rivalParty, setRivalParty] = useState(randomNumber(0, 6, 6))
    const [isDisabled, setIsDisabled] = useState(false)
    const [isBattle, setIsBattle] = useState(false)
    const got = useSelector((state: storeState) => state.got)
    const { pokemonList, pokemonListError } = usePokeSWR();

    const [myBattleParty, setMyBattleParty] = useState<any[]>(
        got.map((got: any) => {
            return ({
                pokeIndex: got,
                checked: false,
            })
        })
    )
    const [playerStatus, setPlayerStatus] = useState([
        { hp: 50, timeLiset: 3 },
        { hp: 50, timeLiset: 3 }
    ])
    const [partyStatus, setPartyStatus] = useState<any>()


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
            "player": checkedMyPokemon.map((member) => { return { "imgUrl": pokemonList[member.pokeIndex]?.sprites.back_default, "power": 10 } }),
            "rival": rivalBattleParty.map((member) => { return { "imgUrl": pokemonList[member]?.sprites.back_default, "power": 10 } })
        }
        setPartyStatus(newPartyStatus);
        setIsBattle(true)
    }

    const selectFighter = () => {

    }

    return (
        <div >
            {!isBattle ? <div className="text-center">
                <div className="flex justify-center">
                    {rivalParty?.map((rivalPokeIndex: any) => {
                        return <Image className="w-28" key={Math.random()}
                            src={pokemonList ? pokemonList[rivalPokeIndex].sprites.back_default : null}
                            className="rounded-full w-10" />
                    })}
                </div>
                <p className="text-red-500 text-4xl">VS</p>

                <div className="flex justify-center">
                    {pokemonList ? got?.map((gotPokeIndex: number, index: number) => {
                        return <label htmlFor={`id_${index}`} key={`key_${index}`} className="flex-col">
                            <Image src={pokemonList[gotPokeIndex]?.sprites.back_default} className="rounded-full w-10" />
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
                            return <label htmlFor={`battleId_${index}`} key={`battleKey_${index}`} className="flex items-center">
                                <Image src={member.imgUrl} className="rounded-full w-44" />
                                <Checkbox
                                    size="xl"
                                    id={`battleId_${index}`}
                                    disabled={false}
                                    onChange={selectFighter}
                                />
                            </label>
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
        </div>
    )
}

export default Battle