import { Button, Checkbox, Divider, Image } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BattleField } from "../components/pokemonBattle/BattleField";
import { DiceRollPhase } from "../components/pokemonBattle/DiceRollPhase";
import { randomNumber } from "../components/pokemonBattle/RandomNumber";
import { SelectPokePhase } from "../components/pokemonBattle/SelectPokePhase";
import { usePokeSWR } from "../hooks/usePokeSwr";
import { storeState } from "../slicer/store";

export type DiceCount = {
    threeDice: number[];
    totalDice: number;
}

export type FighterOrder = {
    id: number;
    order: number;
    checked: boolean
}

const Battle: NextPage = () => {
    const [rivalParty, setRivalParty] = useState(randomNumber(0, 6, 6))
    const [isStatusUpPhase, setIsStatusUpPhase] = useState(false)
    const [isBattlePhase, setIsBattlePhase] = useState(false)

    const [isBattle, setIsBattle] = useState(false)
    const [diceCount, setDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 });
    const [rivalDiceCount, setRivalDiceCount] = useState<DiceCount>({ threeDice: [0, 0, 0], totalDice: 0 })
    const got = useSelector((state: storeState) => state.got)
    const { pokemonList, pokemonListError } = usePokeSWR();
    const [partyStatus, setPartyStatus] = useState()
    const [myBattleParty, setMyBattleParty] = useState<FighterOrder[]>(
        got.map((got: any, index: number) => {
            return ({
                id: index,
                pokeIndex: got,
                checked: false,
            })
        })
    )
    const [playerStatus, setPlayerStatus] = useState([
        { hp: 50, timeLiset: 3 },
        { hp: 50, timeLiset: 3 }
    ])
    const [fighterOrder, setFighterOrder] = useState(
        [...Array(3)].map((notUse, index) => { return { id: index, order: 0, checked: false } })

    )





    /* const startFight = () => {
 
         const fighterSort = () => {
             const newFighterOrder = fighterOrder.sort((fighterA, fighterB) => {
                 if (fighterA.order < fighterB.order) return -1;
                 if (fighterA.order > fighterB.order) return 1;
                 return 0;
             })
             setFighterOrder(newFighterOrder)
         }
 
         const fighting = async () => {
              const log = (num) => {
                  return new Promise(resolve => {
  
  
                      setTimeout(() => {
                          console.log(num);
                          resolve();
                      }, 1000)
                  });
              }
  
  
              await log(3);
              await log(2);
              await log(1);
          }
 
       }  } */


    return (
        <div >
            {!isBattle ?
                <SelectPokePhase
                    rivalParty={rivalParty}
                    pokemonList={pokemonList}
                    myBattleParty={myBattleParty}
                    setIsBattle={setIsBattle}
                    setPartyStatus={setPartyStatus}
                    setMyBattleParty={setMyBattleParty}
                />
                :
                <div>
                    <BattleField
                        fighterOrder={fighterOrder}
                        setFighterOrder={setFighterOrder}
                        isBattlePhase={isBattlePhase}
                        setIsBattlePhase={setIsBattlePhase}
                        diceCount={diceCount}
                        setDiceCount={setDiceCount}
                        rivalDiceCount={rivalDiceCount}
                        setRivalDiceCount={setRivalDiceCount}
                        partyStatus={partyStatus}
                        setPartyStatus={setPartyStatus} />
                    <DiceRollPhase
                        diceCount={diceCount}
                        setDiceCount={setDiceCount}
                        rivalDiceCount={rivalDiceCount}
                        setRivalDiceCount={setRivalDiceCount}
                        setIsStatusUpPhase={setIsStatusUpPhase} />
                </div>
            }

            <div>
                {isBattlePhase ?
                    <Button

                        variant="gradient"
                        gradient={{ from: "orange", to: "red" }}
                        style={{ marginBottom: 30 }}
                    >
                        バトルスタート
                    </Button>
                    : <div>
                    </div>}
            </div>


        </div>
    )
}

export default Battle