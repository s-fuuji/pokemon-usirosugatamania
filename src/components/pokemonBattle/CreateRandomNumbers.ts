type Props = (
    min: number,
    max: number,
    times: number) => number[];

export const CreateRandomNumbers: Props = (min, max, times) => {
    const createRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const randomNumbers: any = [];
    [...Array(times)].map(() => {
        let test = createRandomNumber(min, max);
        while (randomNumbers.includes(test)) {
            test = createRandomNumber(min, max)
        }
        randomNumbers.push(test)
    })
    return randomNumbers
};
