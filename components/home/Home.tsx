import React, { useState, useEffect } from 'react';

import { View, Text, ScrollView, RefreshControl, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalState } from '../../context/GlobalStateContext';
import styles from "../../styles/constants";
import homeStyles from "../../styles/home_page";
import Colors from "../../styles/colors";

export const Home = ({ navigation }: { navigation: any }) => {
    const { globalState, refreshData } = useGlobalState();
    const [previousBalance, setPreviousBalance] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [colorAnim] = useState(new Animated.Value(0));
    const [isIncrease, setIsIncrease] = useState<boolean | null>(null);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshData();
        setRefreshing(false);
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
                // Reset animation value
                colorAnim.setValue(0);
                // Start animation
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
                {/* Balance Section */}
                <View style={homeStyles.balanceContainer}>
                    <Animated.Text style={[
                        homeStyles.balanceAmount,
                        { 
                            fontSize: dynamicFontSize,
                            color: textColor
                        }
                    ]}>${balanceString}</Animated.Text>
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
                        <TouchableOpacity
                            key={index}
                            style={homeStyles.positionCell}
                            onPress={() => navigation.navigate('Trade', { ticker })}
                        >
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
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </LinearGradient>
    );
};

export default Home;