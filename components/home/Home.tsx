import React, { useState, useEffect } from 'react';

import { View, Text, ScrollView, RefreshControl, Animated, TouchableOpacity,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalState } from '../../context/GlobalStateContext';
import styles from "../../styles/constants";
import homeStyles from "../../styles/home_page";
import Colors from "../../styles/colors";
import * as Haptics from 'expo-haptics';
import { deleteLimitOrder } from '../../services/delete_limit_order';

import { closeOrder } from '../../services/hyperliquid/close_order.cjs';



export const Home = ({ navigation }: { navigation: any }) => {
    const { globalState, refreshData } = useGlobalState();
    const [previousBalance, setPreviousBalance] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [colorAnim] = useState(new Animated.Value(0));
    const [isIncrease, setIsIncrease] = useState<boolean | null>(null);
    const [isClosingAll, setIsClosingAll] = useState(false);


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
    const positions = globalState.userState.perps.assetPositions;

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
        const minSize = 32;
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
        <LinearGradient
            colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
            locations={[0, 0.5, .99]}
            start={{ x: .5, y: 0 }}
            end={{ x: .5, y: 1 }}
            style={styles.background}
        >
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
                <View style={homeStyles.balanceContainer}>
                        <Animated.Text style={[
                            homeStyles.balanceAmount,
                            { 
                                fontSize: dynamicFontSize,
                                color: textColor
                            }
                        ]}>${balanceString}</Animated.Text>

                    </View>
                {/* Balance Section */}
                {positions.length > 0 ? (
                    <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={homeStyles.availableBalanceContainer}>
                            <Text style={homeStyles.availableBalanceLabel}>USDC: </Text>
                            <Text style={homeStyles.availableBalanceAmount}>${formatNumber(availableBalance, 2)}</Text>
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
                                <Text style={homeStyles.size}>{size + ' ' + ticker}</Text>
                            </View>
                            <View style={homeStyles.rightSide}>
                                <Text style={homeStyles.price}>${formatNumber(price)}</Text>
                                <Text style={[
                                    homeStyles.pnl,
                                    { 
                                        color: pnl > 0 ? Colors.BRIGHT_GREEN : 
                                            pnl < 0 ? Colors.RED : 
                                            Colors.WHITE 
                                    }
                                ]}>{pnl > 0 ? '+' : '-'}${formatNumber(Math.abs(pnl), 2)}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </LinearGradient>
    );
};

export default Home;