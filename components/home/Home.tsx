import React, { useState, useEffect } from 'react';

import { View, Text, ScrollView, RefreshControl, Animated, TouchableOpacity,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from '../../context/GlobalStateContext';
import homeStyles from "../../styles/home_page";
import Colors from "../../styles/colors";
import * as Haptics from 'expo-haptics';
import { deleteLimitOrder } from '../../services/delete_limit_order';

import { closeOrder } from '../../services/hyperliquid/close_order.cjs';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



export const Home = ({ navigation }: { navigation: any }) => {
    const { globalState, refreshData } = useGlobalState();
    const [previousBalance, setPreviousBalance] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [colorAnim] = useState(new Animated.Value(0));
    const [isIncrease, setIsIncrease] = useState<boolean | null>(null);
    const [isClosingAll, setIsClosingAll] = useState(false);
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);


    useEffect(() => {
        // Load balance visibility preference
        const loadBalancePreference = async () => {
            try {
                const hidden = await AsyncStorage.getItem("balanceHidden");
                setIsBalanceHidden(hidden === 'true');
            } catch (error) {
                console.error('Error loading balance preference:', error);
            }
        };
        loadBalancePreference();
    }, []);

    const toggleBalanceVisibility = async () => {
        const newValue = !isBalanceHidden;
        setIsBalanceHidden(newValue);
        try {
            await AsyncStorage.setItem("balanceHidden", String(newValue));
            await Haptics.impactAsync();
        } catch (error) {
            console.error('Error saving balance preference:', error);
        }
    };

    const navigateToBalancePage = async () => {
        if (!isBalanceHidden) {
            await Haptics.impactAsync();
            navigation.navigate('Balance');
        }
    };

    const hiddenNumber = '******';


    const onRefresh = async () => {
        setRefreshing(true);
        await refreshData();
        setRefreshing(false);
    };

    const formatPercent = (num: number) => {
        return (num * 100).toFixed(2) + '%';
    };

    useEffect(() => {
        if (globalState.userState) {
            const currentBalance = globalState.userState.perps.marginSummary.accountValue;
            if (previousBalance === null) {
                setPreviousBalance(currentBalance);
                return;
            }
            if (currentBalance !== previousBalance) {
                setIsIncrease(currentBalance > previousBalance);
                colorAnim.setValue(0);
                Animated.sequence([
                    Animated.timing(colorAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(colorAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: false,
                    })
                ]).start();
                setPreviousBalance(currentBalance);
            }
        }
    }, [globalState.userState]);

    if (!globalState.userState) return null;

    const balance = globalState.userState.perps.marginSummary.accountValue;
    const availableBalance = globalState.userState.perps.withdrawable;
    const positions = [...globalState.userState.perps.assetPositions].sort((a, b) => 
        b.position.positionValue - a.position.positionValue
    );


    const formatNumber = (num: number, maxDigits: number = 5) => {
        return Number(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: maxDigits
        });
    };

    const balanceString = formatNumber(balance, 2);
    const getFontSize = (str: string) => {
        const length = str.length;
        const maxSize = 68;
        const minSize = 46;
        const maxLength = 15;
        const minLength = 5;
        
        if (length <= minLength) return maxSize;
        if (length >= maxLength) return minSize;
        
        const size = maxSize - ((length - minLength) * (maxSize - minSize) / (maxLength - minLength));
        return Math.round(size);
    };

    const dynamicFontSize = getFontSize(balanceString);

    const tickerIndex = (ticker: string) => {
        return globalState.perpsMeta?.perpsMeta[0].universe.findIndex(
            (asset: any) => asset.name === ticker
        );
    }

    const textColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.WHITE, isIncrease ? Colors.BRIGHT_GREEN : Colors.RED]
    });

    return (
        // <LinearGradient
        //     colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
        //     locations={[0, 0.5, .99]}
        //     start={{ x: .5, y: 0 }}
        //     end={{ x: .5, y: 1 }}
        //     style={styles.background}
        // >
        <View style={homeStyles.background}>
            <ScrollView 
                style={homeStyles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.BRIGHT_GREEN}
                        colors={[Colors.BRIGHT_GREEN]}
                    />
                }
            >  
                <TouchableWithoutFeedback 
                    style={homeStyles.balanceContainer}
                    onPress={navigateToBalancePage}
                    onLongPress={toggleBalanceVisibility}
                    delayLongPress={400}
                >
                    <Animated.Text style={[
                        homeStyles.balanceAmount,
                        { 
                            fontSize: dynamicFontSize,
                            color: textColor
                        }
                    ]}>{isBalanceHidden ? hiddenNumber : "$" + balanceString}</Animated.Text>
                </TouchableWithoutFeedback>
                {/* Balance Section */}
                {positions.length > 0 ? (
                    <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={homeStyles.availableBalanceContainer}>
                            <Text style={homeStyles.availableBalanceLabel}>USDC: </Text>
                            <Text style={homeStyles.availableBalanceAmount}>{isBalanceHidden ? hiddenNumber : "$"+formatNumber(availableBalance, 2)}</Text>
                        </View>
                        <View>
                        {isClosingAll ? (
                                <ActivityIndicator color={Colors.WHITE} size="small" />
                            ) : (
                                <TouchableOpacity>
                                    <Text style={{ 
                                        color: Colors.BRIGHT_GREEN, fontSize: 14, fontWeight: 600, marginRight: 6 
                                    }}
                                    onPress={async () => {
                                        setIsClosingAll(true);
                                        positions.forEach(async (position: any) => {
                                            const ticker = position.position.coin;
                                            await closeOrder(ticker);
                                            await deleteLimitOrder(ticker, true);
                                            await deleteLimitOrder(ticker, false);
                                        });
                                        setIsClosingAll(false);
                                        await Haptics.impactAsync()
                                    }}
                                    >
                                        Close All
                                    </Text>
                                </TouchableOpacity>
                        )}
                        </View>
                    </View>
                    </>
                ) : (
                    <>
                        <View>
                            <Text style={homeStyles.noPositionText}>
                                No open positions
                            </Text>
                        </View>
                    </>
                )}

                {/* Positions Section */}
                {positions.map((item: any, index: any) => {
                    const position = item.position;
                    const ticker = position.coin;
                    const size = Math.abs(position.szi);
                    const leverage = position.leverage.value;
                    const pnl = Number(position.unrealizedPnl);
                    const isLong = position.szi > 0;
                    const price = Number(globalState.perpsMeta?.perpsMeta[1][tickerIndex(ticker)].markPx);
                    const prevDayPrice = Number(globalState.perpsMeta?.perpsMeta[1][tickerIndex(ticker)].prevDayPx);
                    const price24Change = price-prevDayPrice;
                    const price24ChangePct = (((price24Change)/prevDayPrice));
                    const margin = position.marginUsed;
                    const positionValue = formatNumber(Number(position.positionValue), 2);

                    return (
                        <TouchableOpacity
                            key={index}
                            style={homeStyles.positionCell}
                            onPress={async () => {
                                await Haptics.selectionAsync();
                                navigation.navigate('Trade', { ticker });
                            }}
                        >
                            <View style={homeStyles.leftSide}>
                                <View style={homeStyles.tickerContainer}>
                                    <Text style={homeStyles.ticker}>{ticker}</Text>
                                    <Text style={[
                                        homeStyles.leverage,
                                        { color: isLong ? Colors.BRIGHT_GREEN : Colors.RED }
                                    ]}>{leverage}x</Text>
                                </View>
                                <View style={homeStyles.priceContainer}>
                                    <Text style={homeStyles.size}>${formatNumber(price)}</Text>
                                    <Text style={[
                                                homeStyles.priceChange,
                                                { color: price24ChangePct > 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                                            ]}>{price24ChangePct > 0 ? "+" : "-"}{formatPercent(Math.abs(price24ChangePct))}</Text>
                                    </View>
                                </View>
                            <View style={homeStyles.rightSide}>
                                <Text style={homeStyles.price}>{isBalanceHidden ? hiddenNumber : "$" + positionValue}</Text>
                                <Text style={[
                                    homeStyles.pnl,
                                    { 
                                        color: isBalanceHidden ? Colors.WHITE : 
                                            pnl > 0 ? Colors.BRIGHT_GREEN : 
                                                pnl < 0 ? Colors.RED : 
                                                Colors.WHITE 
                                    }
                                ]}>{isBalanceHidden ? hiddenNumber : pnl > 0 ? '+' : '-'}{isBalanceHidden ? "" : "$" + formatNumber(Math.abs(pnl), 2)}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default Home;