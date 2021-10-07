


export const transformTime = (n: string): string => {
    if (parseInt(n) < 10) return '0' + n;
    return n
}

export const zero = (item: string): string => {
    if (parseInt(item) < 10) return '0' + item
    return item
};

