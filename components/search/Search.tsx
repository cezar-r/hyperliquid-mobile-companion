import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from '../../context/GlobalStateContext';
import { TickerData } from "../../common/types";
import styles from "../../styles/constants";
import searchStyles from "../../styles/search_page";
import { Colors } from "../../styles/colors";
import { AssetCtx } from 'hyperliquid/dist';
import AntDesign from '@expo/vector-icons/AntDesign';

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
                tickers.push({
                    maxLev: Number(tickerObj.maxLeverage),
                    volume24h: Number((globalState.perpsMeta.perpsMeta[1][index] as unknown as AssetCtx).dayNtlVlm),
                    ticker: tickerObj.name,
                    szDecimals: Number(tickerObj.szDecimals),
                    price: Number((globalState.perpsMeta.perpsMeta[1][index] as unknown as AssetCtx).markPx)
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
        loadRecentSearches();
    }, []);

    useEffect(() => {
        updateTickerList();
    }, [globalState.perpsMeta]);

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
            onPress={() => {
                addToRecentSearches(item.ticker);
                navigation.navigate('Trade', { ticker: item.ticker });
            }}
        >
            <View style={searchStyles.tickerInfo}>
                <Text style={searchStyles.tickerSymbol}>{item.ticker}</Text>
            </View>
            <Text style={searchStyles.tickerPrice}>${formatNumber(item.price)}</Text>
        </TouchableOpacity>
    );

    if (!globalState.perpsMeta) return null;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                        colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
                        locations={[0, 0.5, .99]}
                        start={{ x: .5, y: 0 }}
                        end={{ x: .5, y: 1 }}
                        style={styles.background}
                    >
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
                        <View style={searchStyles.recentHeaderContainer}>
                            <Text style={searchStyles.sectionTitle}>Recent Searches</Text>
                            {recentSearches.length > 0 && (
                                <TouchableOpacity 
                                    onPress={async () => {
                                        await AsyncStorage.removeItem('recentSearches');
                                        setRecentSearches([]);
                                    }}
                                >
                                    <AntDesign name="closecircle" size={16} color={Colors.LIGHT_GRAY} />
                                </TouchableOpacity>
                            )}
                        </View>
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
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

export default Search;