export const range = (from: number, to: number, step = 1): number[] => {
    const result = [];
    let count = from;

    while (count <= to) {
        result.push(count);
        count += step;
    }

    return result;
};
