import { Button, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isMemberName } from "typescript";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

const Battle: NextPage = () => {
    const [rivalPoke, setRivalPoke] = useState([])
    const [isCheckDisabled, setIsCheckDisabled] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const got = useSelector((state: storeState) => state.got)
    const [myBattleParty, setMyBattleParty]: any[] = useState(
        got.map((got: any) => {
            return ({
                pokeIndex: got,
                checked: false,
            })
        })
    )
    const { pokemonList, pokemonListError } = usePokeSWR();





    const pokemonBattle = () => {
        const rivalPartyArray = [...Array(6)].map(() => {
            const pickRivalPokemon = Math.floor(Math.random() * 40)
            return (pokemonList[pickRivalPokemon])
        })

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




    return (
        <div className="text-center">
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



            <Button
                onClick={pokemonBattle}
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                style={{ marginBottom: 30 }}
            >
                バトルスタート
            </Button>
        </div>
    )
}

export default Battle