import React, { useState, useEffect } from 'react';

import { View, Text, ScrollView, RefreshControl } from 'react-native';

import { getUserState } from "../../services/hyperliquid/get_user_state.cjs";
import styles from "../../styles/constants";
import homeStyles from "../../styles/home_page";
import Colors from "../../styles/colors";
import { UserState } from "../../common/types";

export const Home = () => {
    const [userState, setUserState] = useState<UserState | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const updateUserState = async () => {
        const state = await getUserState();
        setUserState(state);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await updateUserState();
        setRefreshing(false);
    };

    useEffect(() => {
        // Initial load
        updateUserState();

        // Set up interval for auto-refresh every 5 seconds
        const interval = setInterval(() => {
            updateUserState();
        }, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (!userState) return null;

    const balance = userState.perps.marginSummary.accountValue;
    const availableBalance = userState.perps.withdrawable;
    const positions = userState.perps.assetPositions;

    const formatNumber = (num: number) => {
        return Number(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const balanceString = formatNumber(balance);
    const getFontSize = (str: string) => {
        const length = str.length;
        // Linear interpolation between 68px at length 5 and 32px at length 15
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

    return (
        <View style={styles.background}>
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
                {/* Balance Section */}
                <View style={homeStyles.balanceContainer}>
                    <Text style={[
                        homeStyles.balanceAmount,
                        { fontSize: dynamicFontSize }
                    ]}>${balanceString}</Text>
                </View>

                <View style={homeStyles.availableBalanceContainer}>
                    <Text style={homeStyles.availableBalanceLabel}>USDC: </Text>
                    <Text style={homeStyles.availableBalanceAmount}>${formatNumber(availableBalance)}</Text>
                </View>

                {/* Positions Section */}
                {positions.map((item: any, index: any) => {
                    const position = item.position;
                    const ticker = position.coin;
                    const size = Math.abs(position.szi);
                    const leverage = position.leverage.value;
                    const pnl = Number(position.unrealizedPnl);
                    const isLong = position.szi > 0;

                    return (
                        <View key={index} style={homeStyles.positionCell}>
                            <View style={homeStyles.leftSide}>
                                <Text style={homeStyles.ticker}>{ticker}</Text>
                                <Text style={homeStyles.size}>{size + ' ' + ticker}</Text>
                            </View>
                            <View style={homeStyles.rightSide}>
                                <Text style={[
                                    homeStyles.leverage,
                                    { color: isLong ? Colors.BRIGHT_GREEN : Colors.RED }
                                ]}>{leverage}x</Text>
                                <Text style={[
                                    homeStyles.pnl,
                                    { 
                                        color: pnl > 0 ? Colors.BRIGHT_GREEN : 
                                               pnl < 0 ? Colors.RED : 
                                               Colors.WHITE 
                                    }
                                ]}>${formatNumber(pnl)}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default Home;