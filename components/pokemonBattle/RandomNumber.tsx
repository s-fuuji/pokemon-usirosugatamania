type Props = (
    min: number,
    max: number,
    times: number) => number[]

export const randomNumber: Props = (min, max, times) => {
    const createRandoms = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const randoms: any = [];
    [...Array(times)].map(() => {
        let test = createRandoms(min, max);
        while (randoms.includes(test)) {
            test = createRandoms(min, max)
        }
        randoms.push(test)
    })
    return randoms
}
