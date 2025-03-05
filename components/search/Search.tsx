import React, { useState, useEffect } from 'react';
import { 
    View, 
    Keyboard 
} from 'react-native';
import { AssetCtx } from 'hyperliquid/dist';

import styles from "./styles";
import { PageName } from '../../common/constants';
import { TickerData } from "../../common/types";
import { useGlobalState } from '../../context/GlobalStateContext';
import { SearchBar, TickerCell, ResultView } from "./components";
import { SortHeader, SortType } from './components/SortHeader';

export const Search = ({ navigation }: { navigation: any }) => {
    const { globalState } = useGlobalState();
    const [perpsTickerList, setPerpsTickerList] = useState<TickerData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSort, setCurrentSort] = useState<SortType>(SortType.VOLUME);
    const [isAscending, setIsAscending] = useState(false);

    const updateTickerList = () => {
        if (globalState.perpsMeta) {
            const tickers: TickerData[] = [];
            for (let index = 0; index < globalState.perpsMeta.perpsMeta[0].universe.length; index++) {
                const tickerObj = globalState.perpsMeta.perpsMeta[0].universe[index];
                const tickerPerpsData: AssetCtx = globalState.perpsMeta.perpsMeta[1][index] as unknown as AssetCtx
                tickers.push({
                    maxLev: Number(tickerObj.maxLeverage),
                    volume24h: Number(tickerPerpsData.dayNtlVlm),
                    ticker: tickerObj.name,
                    szDecimals: Number(tickerObj.szDecimals),
                    price: Number(tickerPerpsData.markPx),
                    funding: Number(tickerPerpsData.funding),
                    prevDayPx: Number(tickerPerpsData.prevDayPx),
                    openInterest: Number(tickerPerpsData.openInterest)
                });
            }
            setPerpsTickerList(tickers);
        }
    };

    const handleSortPress = (sortType: SortType) => {
        if (currentSort === sortType) {
            setIsAscending(!isAscending);
        } else {
            setCurrentSort(sortType);
            setIsAscending(false);
        }
    };

    const getSortedTickers = (tickers: TickerData[]) => {
        return [...tickers].sort((a, b) => {
            let comparison = 0;
            switch (currentSort) {
                case SortType.VOLUME:
                    comparison = a.volume24h - b.volume24h;
                    break;
                case SortType.LEVERAGE:
                    comparison = a.maxLev - b.maxLev;
                    break;
                case SortType.CHANGE:
                    const aChange = (a.price - a.prevDayPx) / a.prevDayPx;
                    const bChange = (b.price - b.prevDayPx) / b.prevDayPx;
                    comparison = aChange - bChange;
                    break;
                case SortType.ALPHABETICAL:
                    comparison = b.ticker.localeCompare(a.ticker);
                    break;
                case SortType.FUNDING:
                    comparison = a.funding - b.funding;
                    break;
                case SortType.OPEN_INTEREST:
                    comparison = a.openInterest - b.openInterest;
                    break;
            }
            return isAscending ? comparison : -comparison;
        });
    };

    useEffect(() => {
        updateTickerList();
    }, [globalState.perpsMeta]);

    const renderTickerCell = (item: TickerData) => {
        return (
            <React.Fragment key={item.ticker}>
                <TickerCell
                    item={item}
                    currentSort={currentSort}
                    onPress={() => {
                        navigation.navigate(PageName.TRADE, { ticker: item.ticker });
                    }}
                />
            </React.Fragment>
        );
    };

    if (!globalState.perpsMeta) return null;

    return (
        <View style={styles.background}>
            <SearchBar
                searchQuery={searchQuery}
                onChangeText={setSearchQuery}
                onCloseSearch={() => {
                    Keyboard.dismiss();
                    setSearchQuery('');
                }}
            />

            <SortHeader
                currentSort={currentSort}
                isAscending={isAscending}
                onSortPress={handleSortPress}
            />

            <ResultView
                searchQuery={searchQuery}
                perpsTickerList={getSortedTickers(perpsTickerList)}
                renderTickerCell={renderTickerCell}
            />
        </View>
    );
}

export default Search;