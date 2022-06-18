import { Image } from "@mantine/core";
import { useEffect, useState } from "react";


export const Fighting = ({ partyStatus }) => {
    const [order, setOrder] = useState(0)

    const newFighterOrder = partyStatus.player.sort((fighterA, fighterB) => {
        if (fighterA.order < fighterB.order) return -1;
        if (fighterA.order > fighterB.order) return 1;
        return 0;
    })
    const [pokemonChange, setPokemonChange] = useState(newFighterOrder);

    console.log(pokemonChange);

    useEffect((() => {
        setTimeout(() => { setOrder(1) }, 2000);
        setTimeout(() => { setOrder(2) }, 4000);
    }), [])

    return (
        <div>
            {order === 0 && <Image src={pokemonChange[0].imgUrl} className="rounded-full w-44" />}
            {order === 1 && <Image src={pokemonChange[1].imgUrl} className="rounded-full w-44" />}
            {order === 2 && <Image src={pokemonChange[2].imgUrl} className="rounded-full w-44" />}
        </div>

    )
}