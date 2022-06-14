import { Button } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

const Battle: NextPage = () => {
    const [rivalPoke, setRivalPoke] = useState([])
    const { pokemonList, pokemonListError } = usePokeSWR();
    const got = useSelector((state: storeState) => state.got)

    const pokemonBattle = () => {
        const rivalParty = [...Array(6)].map(() => {
            const pickRivalPokemon = Math.floor(Math.random() * 40)
            console.log(pickRivalPokemon);

            return (pokemonList[pickRivalPokemon])
        })
        console.log(rivalParty);
    }


    return (
        <Button
            onClick={pokemonBattle}
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            style={{ marginBottom: 30 }}
        >
            バトルスタート
        </Button>
    )
}

export default Battle