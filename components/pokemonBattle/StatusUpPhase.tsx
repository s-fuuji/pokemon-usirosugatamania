import { Button, Checkbox, Image } from "@mantine/core";
import { useEffect } from "react";
import { PhaseChange } from "./PhaseChange";
import { randomNumber } from "./RandomNumber";



export const StatusUpPhase = ({ diceCount, setDiceCount, partyStatus, setPartyStatus, isStatusUpPhase, setIsBattlePhase, rivalDiceCount, setIsFightPhase, setIsStatusUpPhase, children }) => {
    const rivalPowerUp = () => {
        let newRivalPartyStatus = partyStatus.rival;
        for (let i = rivalDiceCount.totalDice; i > 0; i--) {
            const powerUpIndex = randomNumber(0, 2, 1)[0];
            const preRivalPartyStatus = newRivalPartyStatus.map(rival => {
                return rival.id === powerUpIndex ? { ...rival, power: rival.power + 1 } : rival
            });
            newRivalPartyStatus = preRivalPartyStatus;
        };

        const shuffleNumber = randomNumber(0, 2, 3);
        newRivalPartyStatus = newRivalPartyStatus.map((prev, index: number) => {
            return { ...prev, order: shuffleNumber[index] };
        });

        setPartyStatus(
            { ...partyStatus, rival: newRivalPartyStatus }
        );
    };

    const powerUp = (powerUpIndex: number, up?: string) => {
        if (up && diceCount.totalDice > 0 || !up && partyStatus.player[powerUpIndex].power > 0) {
            const powerUpPokemon = partyStatus.player.map(member => {
                return member.id === powerUpIndex ? { ...member, power: member.power + (up ? +1 : -1) } : member;
            });
            const newPartyStatus = {
                ...partyStatus, player: powerUpPokemon
            };
            setDiceCount({ ...diceCount, totalDice: diceCount.totalDice + (up ? -1 : 1) });
            setPartyStatus(newPartyStatus);
        } else {
            console.log("null");
        };
    };


    const selectFighter = (order: number) => {
        const orderIndex = partyStatus.player.filter(fighter => fighter.checked).length;
        const newPartyStatus = partyStatus.player.map(fighter => {
            return fighter.id === order ? { ...fighter, order: orderIndex, checked: !fighter.checked, disabled: true } : fighter
        });
        setPartyStatus({ ...partyStatus, player: newPartyStatus });
        orderIndex >= 3 && setIsBattlePhase(true);
    };

    const orderLiset = () => {
        const newPlayerPartyStatus = partyStatus.player.map((prev) => { return { ...prev, order: 0, checked: false } });
        setPartyStatus({ ...partyStatus, player: newPlayerPartyStatus });
        setIsBattlePhase(false);

    };

    useEffect(() => {
        orderLiset();
    }, [isStatusUpPhase])


    const startFight = () => {
        rivalPowerUp();
        PhaseChange(setIsStatusUpPhase, setIsFightPhase);
    };

    return (
        <div className="flex justify-around">
            <div>
                {partyStatus.player.map((member: any, index: number) => {
                    return <div className="flex items-center">
                        {isStatusUpPhase && <div>
                            <Button onClick={() => powerUp(index, "up")} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                +
                            </Button>
                            <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                {member.power}
                            </Button>
                            <Button onClick={() => powerUp(index)} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                -
                            </Button>
                        </div>}

                        <label className="flex" htmlFor={`battleId_${index}`} key={`battleKey_${index}`} >
                            <Image src={member.imgUrl} className="rounded-full w-40" />
                            {isStatusUpPhase && <Checkbox
                                size="xl"
                                id={`battleId_${index}`}
                                disabled={partyStatus.player[index].checked}
                                onChange={() => selectFighter(index)}
                                checked={partyStatus.player[index].checked}
                            />}
                        </label>

                    </div>
                })}
            </div>
            <div className="flex-col -ml-32 text-center">
                {partyStatus.player.filter(fighter => fighter.checked).length === 3 && <div>
                    <div className="my-6">
                        <Button onClick={orderLiset} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                            順番をリセット
                        </Button>
                    </div>
                    <div className="my-6">
                        <Button onClick={startFight} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                            戦闘開始
                        </Button>
                    </div>
                </div>}
                <div className="my-36 ml-44">
                    {children}
                </div>

            </div>



            <div>
                {partyStatus.rival.map((member: any, index: number) => {
                    return <Image src={member.imgUrl} className="rounded-full w-40" />
                })}
            </div>
        </div>
    )
}