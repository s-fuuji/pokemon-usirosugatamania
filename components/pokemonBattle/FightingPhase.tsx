import { Button, Image } from "@mantine/core";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { Party, PartyStatus, PlayersStatus } from "../types/battlePageTypes";
import { PhaseChange } from "./PhaseChange";

type Props = {
    setPlayersStatus: Dispatch<SetStateAction<PlayersStatus>>;
    setIsFightPhase: Dispatch<SetStateAction<boolean>>;
    setIsDiceRollPhase: Dispatch<SetStateAction<boolean>>;
    setIsEndPhase: Dispatch<SetStateAction<boolean>>;
    partyStatus: PartyStatus;
    playersStatus: PlayersStatus;
};

export const FightingPhase: FC<Props> = ({
    partyStatus,
    playersStatus,
    setPlayersStatus,
    setIsFightPhase,
    setIsDiceRollPhase,
    setIsEndPhase }) => {
    const [order, setOrder] = useState<number>(0);

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

    const [myFighters, setMyfighters] = useState<Party[]>(newMyFighters);
    const [rivalFighters, setRivalFighters] = useState<Party[]>(newRivalFighters);
    const newMyDamage = myFighters.map((prev, index) => {
        return prev.power - rivalFighters[index].power;
    });
    const [myDamage, setMydamage] = useState<number[]>(newMyDamage);



    const hitPointCheck = (i: number) => {
        setOrder(i);
        setPlayersStatus((prevPlayersStatus) => {
            return myDamage[i] >= 0 ? { playerHp: prevPlayersStatus.playerHp, rivalHp: prevPlayersStatus.rivalHp - myDamage[i] } :
                { playerHp: prevPlayersStatus.playerHp + myDamage[i], rivalHp: prevPlayersStatus.rivalHp };
        });
    };

    const sleep = (milliseconds: number) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    const asyncOrderCount = async (): Promise<void> => {
        for (let i = 0; i < 3; i++) {
            hitPointCheck(i);
            await sleep(2000);
        }
        PhaseChange(setIsFightPhase, setIsDiceRollPhase);
    };

    useEffect(() => {
        if (playersStatus.playerHp <= 0 || playersStatus.rivalHp <= 0) {
            setTimeout(() => {
                PhaseChange(setIsFightPhase, setIsEndPhase)
            }, 1500);
        };
    }, [playersStatus]);

    const effectUsedRef = useRef(false);

    useEffect(() => {
        if (!effectUsedRef.current) {
            asyncOrderCount();
            effectUsedRef.current = true;
        };
    }, []);








    return (
        <div className="">
            <button onClick={asyncOrderCount}>btn</button>

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