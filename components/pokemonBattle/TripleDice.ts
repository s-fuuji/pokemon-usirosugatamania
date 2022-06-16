

export const tripleDice = (setAny: any) => {
    const diceRoll = () => Math.floor(Math.random() * 6 + 1);
    const dice1 = diceRoll();
    const dice2 = diceRoll();
    const dice3 = diceRoll();
    // const totalDice = dice1 + dice2 + dice3;
    const newDice = [dice1, dice2, dice3]

    setAny(newDice)
}