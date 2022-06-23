import { Button, Checkbox, Image } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../slicer/store";
import { MyStaticParty, PartyStatus } from "../types/battlePageTypes";
import { PhaseChange } from "./PhaseChange";
import { CreateRandomNumbers } from "./CreateRandomNumbers";

type Props = {
    rivalPartyArray: number[];
    pokemonList: any[] | undefined;
    playerDefaultParty: MyStaticParty;
    setIsSelectPokePhase: Dispatch<SetStateAction<boolean>>;
    setPlayersPartyStatus: Dispatch<SetStateAction<PartyStatus>>;
    setPlayerDefaultParty: Dispatch<SetStateAction<MyStaticParty>>;
    setIsDiceRollPhase: Dispatch<SetStateAction<boolean>>;
};

export const SelectPokePhase: React.FC<Props> = ({
    rivalPartyArray,
    pokemonList,
    playerDefaultParty,
    setIsSelectPokePhase,
    setPlayersPartyStatus,
    setPlayerDefaultParty,
    setIsDiceRollPhase
}) => {
    const capturedPoke = useSelector((state: storeState) => state.capturedPoke);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (playerDefaultParty.filter(member => member.checked).length === 3) { setIsDisabled(true) } else { setIsDisabled(false) };
    }, [playerDefaultParty]);

    const myPartyChange = (index: number) => {
        const newMyBattleParty = playerDefaultParty.map((member: any, i: number) => {
            if (i !== index) {
                return member
            } else {
                return { ...member, checked: !member.checked }
            }
        }
        );
        setPlayerDefaultParty(newMyBattleParty);
    };

    const battleStart = () => {
        const checkedMyParty = playerDefaultParty.filter(
            member => member.checked
        );
        const rivalBattleParty = CreateRandomNumbers(0, 6, 3);
        const newPartyStatus = {
            player: checkedMyParty.map((member, index) => { return { id: index, imgUrl: pokemonList && pokemonList[member.pokeIndex].sprites.back_default, power: 10, order: 0, checked: false, disabled: false } }),
            rival: rivalBattleParty.map((member, index) => { return { id: index, imgUrl: pokemonList && pokemonList[member]?.sprites.back_default, power: 10, order: 0, checked: false, disabled: false } })
        };
        setPlayersPartyStatus(newPartyStatus);
        PhaseChange(setIsSelectPokePhase, setIsDiceRollPhase);
    };

    return (
        <div className="text-center">
            <div className="flex justify-center">
                {rivalPartyArray?.map((rivalPokeIndex: any) => {
                    return <Image key={Math.random()}
                        src={pokemonList && pokemonList[rivalPokeIndex].sprites.back_default}
                        className="rounded-full w-36 mx-10" />
                })}
            </div>
            <p className="text-red-500 text-4xl">VS</p>

            <div className="flex-col ">
                <div className="flex justify-center">
                    {pokemonList && capturedPoke?.map((gotPokeIndex: number, index: number) => {
                        return <label htmlFor={`id_${index}`} key={`key_${index}`} className="flex-col">
                            <Image src={pokemonList[gotPokeIndex]?.sprites.back_default} className="rounded-full w-36 mx-10" />
                            <Checkbox
                                className="pl-24"
                                id={`id_${index}`}
                                size="xl"
                                disabled={!playerDefaultParty[index]?.checked ? isDisabled : false}
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
    )
};