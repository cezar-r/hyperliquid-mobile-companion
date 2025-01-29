import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPerpsMeta } from "../../services/hyperliquid/get_perps_meta.cjs";
import { PerpsMeta, TickerData } from "../../common/types";
import styles from "../../styles/constants";
import searchStyles from "../../styles/search_page";
import { Colors } from "../../styles/colors";
import { AssetCtx } from 'hyperliquid/dist';

export const Search = () => {
    const [perpsMeta, setPerpsMeta] = useState<PerpsMeta | null>(null);
    const [perpsTickerList, setPerpsTickerList] = useState<TickerData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const updatePerpsState = async () => {
        const state = await getPerpsMeta();
        setPerpsMeta(state);
    };

    const updateTickerList = () => {
        if (perpsMeta) {
            const tickers: TickerData[] = [];
            for (let index = 0; index < perpsMeta.perpsMeta[0].universe.length; index++) {
                const tickerObj = perpsMeta.perpsMeta[0].universe[index];
                tickers.push({
                    maxLev: Number(tickerObj.maxLeverage),
                    volume24h: Number((perpsMeta.perpsMeta[1][index] as unknown as AssetCtx).dayNtlVlm),
                    ticker: tickerObj.name,
                    szDecimals: Number(tickerObj.szDecimals),
                    price: Number((perpsMeta.perpsMeta[1][index] as unknown as AssetCtx).markPx)
                });
            }
            setPerpsTickerList(tickers);
        }
    }

    const loadRecentSearches = async () => {
        try {
            const searches = await AsyncStorage.getItem('recentSearches');
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
            ].slice(0, 10); // Keep only last 10 searches
            setRecentSearches(updatedSearches);
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        } catch (error) {
            console.error('Error saving recent search:', error);
        }
    };


    useEffect(() => {
        updatePerpsState();
        loadRecentSearches();
    }, []);

    useEffect(() => {
        updateTickerList();
    }, [perpsMeta]);

    const formatNumber = (num: number) => {
        return Number(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const getFilteredTickers = () => {
        if (!searchQuery) return [];
        return perpsTickerList
            .filter(item => item.ticker.toLowerCase().startsWith(searchQuery.toLowerCase()))
            .sort((a, b) => b.volume24h - a.volume24h);
    };

    const renderTickerCell = (item: any) => (
        <TouchableOpacity 
            key={item.ticker}
            style={searchStyles.tickerCell}
            onPress={() => addToRecentSearches(item.ticker)}
        >
            <View style={searchStyles.tickerInfo}>
                <Text style={searchStyles.tickerSymbol}>{item.ticker}</Text>
            </View>
            <Text style={searchStyles.tickerPrice}>${formatNumber(item.price)}</Text>
        </TouchableOpacity>
    );

    if (!perpsMeta) return null;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
                <View style={searchStyles.searchBarContainer}>
                    <Ionicons name="search" size={20} color={Colors.BRIGHT_GREEN} style={searchStyles.searchIcon} />
                    <TextInput
                        style={searchStyles.searchInput}
                        // placeholder="Search"
                        // placeholderTextColor={Colors.BRIGHT}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <ScrollView style={searchStyles.resultsContainer}>
                    {searchQuery === '' ? (
                        <>
                            <Text style={searchStyles.sectionTitle}>Recent Searches</Text>
                            {recentSearches.map(ticker => {
                                const tickerData = perpsTickerList.find(item => item.ticker === ticker);
                                if (tickerData) {
                                    return renderTickerCell(tickerData);
                                }
                                return null;
                            })}
                        </>
                    ) : (
                        // Show search results
                        getFilteredTickers().map(item => renderTickerCell(item))
                    )}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Search;