import { Button, Checkbox, Image } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../slicer/store";
import { MyStaticParty, PartyStatus } from "../types/battlePageTypes";
import { PhaseChange } from "./PhaseChange";
import { randomNumber } from "./RandomNumber";

type Props = {
    rivalParty: number[];
    pokemonList: any[] | undefined;
    myBattleParty: MyStaticParty;
    setIsSelectPokePhase: Dispatch<SetStateAction<boolean>>;
    setPartyStatus: Dispatch<SetStateAction<PartyStatus>>;
    setMyBattleParty: Dispatch<SetStateAction<MyStaticParty>>;
    setIsDiceRollPhase: Dispatch<SetStateAction<boolean>>;
};

export const SelectPokePhase: React.FC<Props> = ({
    rivalParty,
    pokemonList,
    myBattleParty,
    setIsSelectPokePhase,
    setPartyStatus,
    setMyBattleParty,
    setIsDiceRollPhase
}) => {
    const got = useSelector((state: storeState) => state.got);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (myBattleParty.filter(member => member.checked).length === 3) { setIsDisabled(true) } else { setIsDisabled(false) };
    }, [myBattleParty]);

    const myPartyChange = (index: number) => {
        const newMyBattleParty = myBattleParty.map((member: any, i: number) => {
            return i !== index ? member : { ...member, checked: !member.checked }
        }
        );
        setMyBattleParty(newMyBattleParty);
    };

    const battleStart = () => {
        const checkedMyParty = myBattleParty.filter(
            member => member.checked
        );
        const rivalBattleParty = randomNumber(0, 6, 3);
        const newPartyStatus = {
            player: checkedMyParty.map((member, index) => { return { id: index, imgUrl: pokemonList && pokemonList[member.pokeIndex].sprites.back_default, power: 10, order: 0, checked: false, disabled: false } }),
            rival: rivalBattleParty.map((member, index) => { return { id: index, imgUrl: pokemonList && pokemonList[member]?.sprites.back_default, power: 10, order: 0, checked: false, disabled: false } })
        };
        setPartyStatus(newPartyStatus);
        PhaseChange(setIsSelectPokePhase, setIsDiceRollPhase);
    };

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
                                variant="gradient"
                                gradient={{ from: "orange", to: "red" }}
                                style={{ marginBottom: 30 }}
                            >
                                ポケモンを3匹選んでください
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