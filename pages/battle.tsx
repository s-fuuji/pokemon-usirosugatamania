import { Button, Image } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

const Battle: NextPage = () => {
    const [rivalPoke, setRivalPoke] = useState([])
    const [myBattleParty, setMyBattleParty]: any[] = useState([])
    const { pokemonList, pokemonListError } = usePokeSWR();
    const got = useSelector((state: storeState) => state.got)

    const pokemonBattle = () => {
        const rivalPartyArray = [...Array(6)].map(() => {
            const pickRivalPokemon = Math.floor(Math.random() * 40)
            return (pokemonList[pickRivalPokemon])
        })

    }



    const myPartyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMyBattleParty(!myBattleParty.includes(e.target.value) ?
            [...myBattleParty, e.target.value] :
            myBattleParty.filter((menber: string) => {
                return menber !== e.target.value
            }))
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

                            onChange={myPartyChange}
                            value={gotPokeIndex}
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