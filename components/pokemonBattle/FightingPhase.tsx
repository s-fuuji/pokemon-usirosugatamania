import { Button, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { textSpanContainsPosition } from "typescript";
import { PhaseChange } from "./PhaseChange";


export const FightingPhase = ({ partyStatus, playersStatus, setPlayersStatus, setIsFightPhase, setIsDiceRollPhase, setIsEndPhase }) => {
    const [order, setOrder] = useState(0);

    const newMyFighters = [...partyStatus.player].sort((fighterA, fighterB) => {
        if (fighterA.order < fighterB.order) return -1;
        if (fighterA.order > fighterB.order) return 1;
        return 0;
    });

    const newRivalFighters = [...partyStatus.rival].sort((fighterA, fighterB) => {
        if (fighterA.order < fighterB.order) return -1;
        if (fighterA.order > fighterB.order) return 1;
        return 0;
    });

    const [myFighters, setMyfighters] = useState(newMyFighters);
    const [rivalFighters, setRivalFighters] = useState(newRivalFighters);
    const newMyDamage = myFighters.map((prev, index) => {
        return prev.power - rivalFighters[index].power;
    });
    const [myDamage, setMydamage] = useState(newMyDamage);



    const hitPointCheck = () => {
        const newPlayersStatus = myDamage.reduce((prev, current) => {
            return current >= 0 ? { playerHp: prev.playerHp, rivalHp: prev.rivalHp - current } :
                { playerHp: prev.playerHp + current, rivalHp: prev.rivalHp }
        }, playersStatus);
        setPlayersStatus(newPlayersStatus);
    };


    useEffect(() => {
        setTimeout(() => { setOrder(1) }, 2000);
        setTimeout(() => { setOrder(2) }, 4000);
        setTimeout(() => { PhaseChange(setIsFightPhase, setIsDiceRollPhase) }, 6000);
        hitPointCheck();
    }, []);

    (playersStatus.playerHp <= 0 || playersStatus.rivalHP <= 0) && PhaseChange(setIsFightPhase, setIsEndPhase);

    return (
        <div className="">
            {order === 0 && <div className="flex items-center">
                <Image src={myFighters[0].imgUrl} className="rounded-full w-44" />
                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                    {myDamage[0] >= 0 ? `相手に-${myDamage[0]}ダメージ！` : `自分に${myDamage[0]}ダメージ！`}
                </Button>
                <Image src={rivalFighters[0].imgUrl} className="rounded-full w-44" />
            </div>}
            {order === 1 && <div className="flex items-center">
                <Image src={myFighters[1].imgUrl} className="rounded-full w-44" />
                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                    {myDamage[1] >= 0 ? `相手に-${myDamage[1]}ダメージ！` : `自分に${myDamage[1]}ダメージ！`}
                </Button>
                <Image src={rivalFighters[1].imgUrl} className="rounded-full w-44" />
            </div>}
            {order === 2 && <div className="flex items-center">
                <Image src={myFighters[2].imgUrl} className="rounded-full w-44" />
                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                    {myDamage[2] >= 0 ? `相手に-${myDamage[2]}ダメージ！` : `自分に${myDamage[2]}ダメージ！`}
                </Button>
                <Image src={rivalFighters[2].imgUrl} className="rounded-full w-44" />
            </div>}
        </div>

    )
}