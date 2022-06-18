import { Button, Image } from "@mantine/core";
import { useEffect, useState } from "react";


export const Fighting = ({ partyStatus }) => {
    const [order, setOrder] = useState(0);
    const [rivalOrder, setRivalOrder] = useState(0)

    const newMyFighters = partyStatus.player.sort((fighterA, fighterB) => {
        if (fighterA.order < fighterB.order) return -1;
        if (fighterA.order > fighterB.order) return 1;
        return 0;
    })

    const newRivalFighters = partyStatus.rival.sort((fighterA, fighterB) => {
        if (fighterA.order < fighterB.order) return -1;
        if (fighterA.order > fighterB.order) return 1;
        return 0;
    })


    const [myFighters, setMyfighters] = useState(newMyFighters);
    const [rivalFighters, setRivalFighters] = useState(newRivalFighters);
    const newMyDamage = myFighters.map((prev, index) => {
        return prev.power - rivalFighters[index].power;
    })
    const [myDamage, setMydamage] = useState(newMyDamage)




    console.log(myDamage);

    useEffect((() => {
        setTimeout(() => { setOrder(1) }, 2000);
        setTimeout(() => { setOrder(2) }, 4000);
    }), [])

    return (
        <div className="h-56 block">
            <div className="mt-36 -ml-80"></div>
            {order === 0 && <div className="flex items-center">
                <Image src={myFighters[0].imgUrl} className="rounded-full w-44" />
                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>{myDamage[0]}ダメージ </Button>
                <Image src={rivalFighters[0].imgUrl} className="rounded-full w-44" />
            </div>}
            {order === 1 && <div className="flex items-center">
                <Image src={myFighters[1].imgUrl} className="rounded-full w-44" />
                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>{myDamage[1]}ダメージ</Button>
                <Image src={rivalFighters[1].imgUrl} className="rounded-full w-44" />
            </div>}
            {order === 2 && <div className="flex items-center">
                <Image src={myFighters[2].imgUrl} className="rounded-full w-44" />
                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>{myDamage[2]}ダメージ</Button>
                <Image src={rivalFighters[2].imgUrl} className="rounded-full w-44" />
            </div>}
        </div>

    )
}