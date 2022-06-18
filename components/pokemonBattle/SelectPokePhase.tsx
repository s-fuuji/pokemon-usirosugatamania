import { Button, Checkbox, Image } from "@mantine/core"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { storeState } from "../../slicer/store"
import { randomNumber } from "./RandomNumber"

export const SelectPokePhase = ({ rivalParty, pokemonList, myBattleParty, setIsBattle, setPartyStatus, setMyBattleParty }) => {
    const got = useSelector((state: storeState) => state.got)
    const [isDisabled, setIsDisabled] = useState(false)
    const pokemonBattle = () => {

    }

    useEffect(() => {
        myBattleParty.filter(member => member.checked).length === 3 ?
            setIsDisabled(true) : setIsDisabled(false)
    }, [myBattleParty])





    const myPartyChange = (index: number) => {
        const toggleParty = myBattleParty.map((member: any, i: number) => {
            return i !== index ? member : { ...member, checked: !member.checked }
        }
        )
        setMyBattleParty(toggleParty)
    }

    const battleStart = () => {
        const checkedMyParty = myBattleParty.filter(
            member => member.checked
        );
        const rivalBattleParty = randomNumber(0, 6, 3);
        const newPartyStatus = {
            "player": checkedMyParty.map((member, index) => { return { id: index, imgUrl: pokemonList[member.pokeIndex]?.sprites.back_default, power: 10, order: 0, checked: false, disabled: false } }),
            "rival": rivalBattleParty.map((member, index) => { return { id: index, imgUrl: pokemonList[member]?.sprites.back_default, power: 10, order: 0, checked: false, disabled: false } })
        };
        setPartyStatus(newPartyStatus);
        setIsBattle(true);
    }

    return (
        <div>
            <div className="text-center">
                <div className="flex justify-center">
                    {rivalParty?.map((rivalPokeIndex: any) => {
                        return <Image key={Math.random()}
                            src={pokemonList && pokemonList[rivalPokeIndex].sprites.back_default}
                            className="rounded-full w-36 mx-10" />
                    })}
                </div>
                <p className="text-red-500 text-4xl">VS</p>

                <div className="flex-col ">
                    <div className="flex justify-center">
                        {pokemonList && got?.map((gotPokeIndex: number, index: number) => {
                            return <label htmlFor={`id_${index}`} key={`key_${index}`} className="flex-col">
                                <Image src={pokemonList[gotPokeIndex]?.sprites.back_default} className="rounded-full w-36 mx-10" />
                                <Checkbox
                                    className="pl-24"
                                    id={`id_${index}`}
                                    size="xl"
                                    disabled={!myBattleParty[index]?.checked ? isDisabled : false}
                                    onChange={() => myPartyChange(index)}
                                />
                            </label>
                        })}
                    </div>
                    <div className="text-center mt-20">
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
            </div>
        </div>)




}