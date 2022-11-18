export const getRandomIntInclusive = (max: number, min?: number): number => {
    if (!min) {
        return Math.floor(Math.random() * max);
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
};
