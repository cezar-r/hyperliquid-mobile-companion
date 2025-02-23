export const formatNumber = (num: number, maxDecimals: number = 2) => {
    return Number(num).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: maxDecimals
    });
};

export const formatPercent = (num: number) => {
    return (num * 100).toFixed(2) + '%';
};