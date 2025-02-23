import React, { useState, useEffect } from 'react';

import { View, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "../../styles/home_page";
import Colors from "../../styles/colors";
import { useGlobalState } from '../../context/GlobalStateContext';
import { deleteLimitOrder } from '../../services/delete_limit_order';
import { closeOrder } from '../../services/hyperliquid/close_order.cjs';
import { PageName, LocalStorageKey } from '../../common/constants';
import { BalanceView, PositionsHeader, NoPositions, PositionsView } from './home_components';
import { defaultHaptic, selectionHaptic } from '../common/HapticTypes';

export const Home = ({ navigation }: { navigation: any }) => {
    const { globalState, refreshData } = useGlobalState();
    const [refreshing, setRefreshing] = useState(false);
    const [isClosingAll, setIsClosingAll] = useState(false);
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);

    useEffect(() => {
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
            await AsyncStorage.setItem(LocalStorageKey.BALANCE_HIDDEN, String(newValue));
            await defaultHaptic()
        } catch (error) {
            console.error('Error saving balance preference:', error);
        }
    };

    const navigateToBalancePage = async () => {
        if (!isBalanceHidden) {
            await defaultHaptic()
            navigation.navigate(PageName.BALANCE);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshData();
        setRefreshing(false);
    };

    if (!globalState.userState) return null;

    const positions = [...globalState.userState.perps.assetPositions].sort((a, b) => 
        b.position.positionValue - a.position.positionValue
    );

    return (
        <View style={styles.background}>
            <ScrollView 
                style={styles.scrollView}
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
                <BalanceView
                    onPress={navigateToBalancePage}
                    onLongPress={toggleBalanceVisibility}
                    isBalanceHidden={isBalanceHidden}
                />
                
                {positions.length > 0 ? (
                    <PositionsHeader
                        isClosingAll={isClosingAll}
                        isBalanceHidden={isBalanceHidden}
                        onCloseAllPress={async () => {
                            setIsClosingAll(true);
                            positions.forEach(async (position: any) => {
                                const ticker = position.position.coin;
                                await closeOrder(ticker);
                                await deleteLimitOrder(ticker, true);
                                await deleteLimitOrder(ticker, false);
                            });
                            setIsClosingAll(false);
                            await defaultHaptic();
                        }}
                    />
                ) : (
                    <NoPositions />
                )}

                <PositionsView
                    positions={positions}
                    isBalanceHidden={isBalanceHidden}
                    onCellPress={async (ticker: string) => {
                        await selectionHaptic();
                        navigation.navigate(PageName.TRADE, { ticker });
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default Home;