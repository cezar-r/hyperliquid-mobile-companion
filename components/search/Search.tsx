import React, { useState, useEffect } from 'react';
import { 
    View, 
    Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AssetCtx } from 'hyperliquid/dist';

import styles from "../../styles/search_page";
import { LocalStorageKey, PageName } from '../../common/constants';
import { TickerData } from "../../common/types";
import { useGlobalState } from '../../context/GlobalStateContext';
import { SearchBar, TickerCell, ResultView } from "./components";

export const Search = ({ navigation }: { navigation: any }) => {
    const { globalState } = useGlobalState();
    const [perpsTickerList, setPerpsTickerList] = useState<TickerData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

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
                    prevDayPx: Number(tickerPerpsData.prevDayPx)
                });
            }
            setPerpsTickerList(tickers);
        }
    };

    const loadRecentSearches = async () => {
        try {
            const searches = await AsyncStorage.getItem(LocalStorageKey.RECENT_SEARCHES);
            if (searches) {
                setRecentSearches(JSON.parse(searches));
            }
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    };

    const addToRecentSearches = async (ticker: string) => {
        try {
            const updatedSearches = [
                ticker,
                ...recentSearches.filter(t => t !== ticker)
            ].slice(0, 20);
            setRecentSearches(updatedSearches);
            await AsyncStorage.setItem(LocalStorageKey.RECENT_SEARCHES, JSON.stringify(updatedSearches));
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        loadRecentSearches();
    }, []);

    useEffect(() => {
        updateTickerList();
    }, [globalState.perpsMeta]);

    const renderTickerCell = (item: TickerData) => {
        return (
            <React.Fragment key={item.ticker}>
                <TickerCell
                    item={item}
                    onPress={() => {
                        addToRecentSearches(item.ticker);
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

            <ResultView
                searchQuery={searchQuery}
                recentSearches={recentSearches}
                perpsTickerList={perpsTickerList}
                onClearRecentSearchesPress={async () => {
                    await AsyncStorage.removeItem(LocalStorageKey.RECENT_SEARCHES);
                    setRecentSearches([]);
                }}
                renderTickerCell={renderTickerCell}
            />
        </View>
    );
}

export default Search;