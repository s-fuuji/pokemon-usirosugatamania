import { Button, Checkbox, Image } from "@mantine/core"
import { FighterOrder } from "../../pages/battle";
import { randomNumber } from "./RandomNumber";

type Props = {
    fighterOrder: FighterOrder;
    setFighterOrder;
    isBattlePhase;
    setIsBattlePhase;
    diceCount;
    setDiceCount;
    partyStatus;
    setPartyStatus;
}



export const BattleField = ({ fighterOrder, setFighterOrder, isBattlePhase, setIsBattlePhase, diceCount, setDiceCount, rivalDiceCount, setRivalDiceCount, partyStatus, setPartyStatus }) => {

    console.log(rivalDiceCount);

    const rivalStatusUp = () => {
        console.log(partyStatus);
        console.log(rivalDiceCount);

        for (let i = rivalDiceCount.totalDice; i > 0; i--) {
            setRivalDiceCount({ ...rivalDiceCount, totalDice: rivalDiceCount.totalDice - 1 });
            const powerUpIndex = randomNumber(0, 2, 1);
            const newRivalPartyStatus = partyStatus.rival.map(rival => { return rival.id === powerUpIndex ? { ...rival, power: rival.power + 1 } : rival });
            setPartyStatus({ ...partyStatus, rival: newRivalPartyStatus });
        }

    }


    const selectFighter = (order: number) => {
        const orderIndex = fighterOrder.filter(fighter => fighter.checked).length;

        const newFighterOrder = fighterOrder.map(fighter => {
            return fighter.id === order ? { ...fighter, order: orderIndex, checked: !fighter.checked } : fighter
        })
        setFighterOrder(newFighterOrder);
        orderIndex >= 2 && setIsBattlePhase(true)
    }

    const orderLiset = () => {
        setFighterOrder([...Array(3)].map((notUse, index) => { return { id: index, order: 0, checked: false } }));
        setIsBattlePhase(false);

    }
    const powerUp = (powerUpIndex: number, up?: string) => {

        if (up && diceCount.totalDice > 0 || !up && partyStatus.player[powerUpIndex].power > 0) {
            const powerUpPokemon = partyStatus.player.map(member => {
                return member.id === powerUpIndex ? { ...member, power: member.power + (up ? +1 : -1) } : member;
            });

            const newPartyStatus = {
                ...partyStatus, player: powerUpPokemon
            };
            setDiceCount({ ...diceCount, totalDice: diceCount.totalDice + (up ? -1 : 1) })
            setPartyStatus(newPartyStatus)
        } else {
            console.log("null");
        }
    }






    return (
        <div className="flex justify-around">
            <div>
                {partyStatus.player.map((member: any, index: number) => {
                    return <div className="flex items-center">
                        <Button onClick={() => powerUp(index, "up")} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                            +
                        </Button>
                        <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                            {member.power}
                        </Button>
                        <Button onClick={() => powerUp(index)} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                            -
                        </Button>

                        <label className="flex" htmlFor={`battleId_${index}`} key={`battleKey_${index}`} >
                            <Image src={member.imgUrl} className="rounded-full w-44" />
                            <Checkbox
                                size="xl"
                                id={`battleId_${index}`}
                                disabled={isBattlePhase}
                                onChange={() => selectFighter(index)}
                                checked={fighterOrder[index]?.checked}
                            />
                        </label>

                    </div>
                })}
            </div>
            <Button onClick={orderLiset} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                順番をリセット
            </Button>
            <Button onClick={rivalStatusUp} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                test
            </Button>

            <div>
                {partyStatus.rival.map((member: any, index: number) => {
                    return <Image src={member.imgUrl} className="rounded-full w-44" />
                })}
            </div>
        </div>
    )
}