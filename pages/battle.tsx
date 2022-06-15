import { Button, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

const Battle: NextPage = () => {
    const [rivalParty, setRivalParty] = useState<number[]>([])
    const [isDisabled, setIsDisabled] = useState(false)
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
    const [partyStatus, setPartyStatus] = useState()


    const randomNumber = (min: number, max: number) => {
        const createRandoms = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const randoms: any = [];
        [...Array(max)].map(() => {
            let test = createRandoms(min, max);
            while (randoms.includes(test)) {
                test = createRandoms(min, max)
            }
            randoms.push(test)
        })
        return randoms
    }




    const pokemonBattle = () => {
        const newRivalParty = [...Array(6)].map(() => {
            const pickRivalPokemon = Math.floor(Math.random() * 40)
            return (pokemonList[pickRivalPokemon])
        });
        setRivalParty(newRivalParty)
        console.log(rivalParty);

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


        /* const newPartyStatus = {
             "player": checkedMyPokemon.map((member) => { return { "id": pokemonList[member]?.sprites.back_default, "power": 10 } }),
             "rival": [{ id: index, power:}]
 
         }
 
         setPartyStatus */

    }


    return (
        <div className="text-center">

            <div className="flex justify-center">
                {rivalParty?.map((rivalPokeIndex: any) => {
                    console.log(rivalPokeIndex);

                    return <Image key={Math.random()} src={rivalPokeIndex.sprites.back_default} className="rounded-full w-10" />
                })}
            </div>
            <p className="text-red-500 text-4xl">VS</p>

            <div className="flex justify-center">
                {pokemonList ? got?.map((gotPokeIndex: number, index: number) => {
                    return <label htmlFor={`id_${index}`} key={`key_${index}`} className="flex-col">
                        <Image src={pokemonList[gotPokeIndex]?.sprites.back_default} className="rounded-full w-10" />
                        <input
                            id={`id_${index}`}
                            type="checkbox"
                            disabled={!myBattleParty[index].checked ? isDisabled : false}
                            onChange={(e) => myPartyChange(e, index)}

                        />

                    </label>
                }) : null}
            </div>


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
    )
}

export default Battle