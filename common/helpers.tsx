export const formatNumber = (num: number, maxDecimals: number = 2) => {
    return Number(num).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: maxDecimals
    });
};

export const formatPercent = (num: number) => {
    return (num * 100).toFixed(2) + '%';
};

export const getTickerUniverseIndex = (ticker: string, universe: []) => {
    return universe.findIndex(
        (asset: any) => asset.name === ticker
    );
}

export const calculateProfitLoss = (price: string, isTp: boolean, position: any) => {
    if (!position || !Number(position.entryPx) || !price) return { percent: 0, value: 0 };
    const priceNum = Number(price);
    const size = Math.abs(Number(position.szi));
    const percent = ((priceNum - Number(position.entryPx)) / Number(position.entryPx)) * 100 * position.leverage.value;
    const value = (priceNum - Number(position.entryPx)) * size;
    const isLong = Number(position.szi) > 0;

    return { 
      percent: isLong ? percent : -percent,
      value: isLong ? value : -value
    };
};