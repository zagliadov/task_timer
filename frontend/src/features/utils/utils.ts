


export const transformTime = (n: any): any => {
    if(!n) return n
    if (parseInt(n) < 10) return '0' + n;
    return n
}

export const zero = (item: any): any => {
    if(!item) return item
    if (parseInt(item) < 10) return '0' + item
    return item
};

