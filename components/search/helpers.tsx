import { TickerData } from "../../common/types";

export const getFilteredTickers = (
    searchQuery: string,
    perpsTickerList: TickerData[],
) => {
    if (!searchQuery) return perpsTickerList;
    return perpsTickerList
        .filter(item => item.ticker.toLowerCase().startsWith(searchQuery.toLowerCase()))
        .sort((a, b) => b.volume24h - a.volume24h);
};
