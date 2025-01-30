import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for back arrow
import { useGlobalState } from '../../context/GlobalStateContext';
import { LinearGradient } from 'expo-linear-gradient';
import tradeStyles from "../../styles/trade_page";
import PlaceOrderSheet from './PlaceOrderSheet';


import Colors from "../../styles/colors";

const Trade = ({ route, navigation }: any) => {
    const { globalState } = useGlobalState();
    const { ticker } = route.params;
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);
    const [isIncrease, setIsIncrease] = useState<boolean | null>(null);
    const [colorAnim] = useState(new Animated.Value(0));
    const [isOrderSheetVisible, setIsOrderSheetVisible] = useState(false);
    const [isBuyOrder, setIsBuyOrder] = useState(true);

    // Find position data if exists
    const position = globalState.userState?.perps.assetPositions.find(
        (item: any) => item.position.coin === ticker
    )?.position;

    // Find current price from perpsMeta
    const universeIndex = globalState.perpsMeta?.perpsMeta[0].universe.findIndex(
        (asset: any) => asset.name === ticker
    );
    const currentPrice = Number(globalState.perpsMeta?.perpsMeta[1][universeIndex].markPx);
    const prevDayPrice = Number(globalState.perpsMeta?.perpsMeta[1][universeIndex].prevDayPx);
    const price24Change = currentPrice-prevDayPrice;
    const price24ChangePct = (((price24Change)/prevDayPrice))*100;
    const maxLev = Number(globalState.perpsMeta?.perpsMeta[0].universe[universeIndex].maxLeverage);
    const szDecimals = Number(globalState.perpsMeta?.perpsMeta[0].universe[universeIndex].szDecimals);


    useEffect(() => {
        if (previousPrice === null) {
            setPreviousPrice(currentPrice);
            return;
        }
        
        if (currentPrice !== previousPrice) {
            setIsIncrease(currentPrice > previousPrice);
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
            setPreviousPrice(currentPrice);
        }
    }, [currentPrice]);

    const textColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.WHITE, isIncrease ? Colors.BRIGHT_GREEN : Colors.RED]
    });

    const formatNumber = (num: number) => {
        return Number(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatPercent = (num: number) => {
        return (num * 100).toFixed(2) + '%';
    };

    return (
         <LinearGradient
            colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
            locations={[0, 0.5, .99]}
            start={{ x: .5, y: 1 }}
            end={{ x: .5, y: 0 }}
            style={tradeStyles.background}
        >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons style={tradeStyles.backArrow} name="chevron-back" size={32} />
            </TouchableOpacity>
            {/* Ticker and Price Section */}
            <View style={tradeStyles.header}>
                <Text style={tradeStyles.ticker}>{ticker}</Text>
                <Animated.Text style={[tradeStyles.price, { color: textColor }]}>
                        ${formatNumber(currentPrice)}
                </Animated.Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text
                        style={[
                            tradeStyles.percentageChange,
                            {
                            color: price24ChangePct >= 0 ? Colors.BRIGHT_GREEN : Colors.RED,
                            },
                        ]}>
                        {price24ChangePct >= 0 ? '▲ ' : '▼ '}
                        ${formatNumber(Math.abs(price24Change))} ({price24ChangePct.toFixed(2)}%)
                    </Text>
                    <Text style={tradeStyles.percetangeLabel}>
                        24h
                    </Text>
                </View>
            </View>
            {/* <View style={tradeStyles.headerSplit}></View> */}
            
            {position ? (
                <>
                    <Text style={tradeStyles.sectionTitle}>Open Position</Text>
                    <View style={tradeStyles.tableContainer}>
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>Leverage</Text>
                            <Text style={[
                                tradeStyles.value,
                                { color: Number(position.szi) > 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                            ]}>{position.leverage.value}x</Text>
                        </View>
    
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>Size</Text>
                            <Text style={tradeStyles.value}>{Math.abs(Number(position.szi))} {ticker}</Text>
                        </View>
    
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>Position Value</Text>
                            <Text style={tradeStyles.value}>${formatNumber(Number(position.positionValue))}</Text>
                        </View>
    
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>Entry Price</Text>
                            <Text style={tradeStyles.value}>${formatNumber(Number(position.entryPx))}</Text>
                        </View>
    
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>Mark Price</Text>
                            <Text style={tradeStyles.value}>${formatNumber(currentPrice)}</Text>
                        </View>
    
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>PnL</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[
                                    tradeStyles.value,
                                    { color: Number(position.unrealizedPnl) > 0 ? Colors.BRIGHT_GREEN :
                                            Number(position.unrealizedPnl) < 0 ? Colors.RED : Colors.WHITE }
                                ]}>${formatNumber(Number(position.unrealizedPnl))} ({formatPercent(Number(position.returnOnEquity))})</Text>
                            </View>
                        </View>
    
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>Liquidation Price</Text>
                            <Text style={tradeStyles.value}>${formatNumber(Number(position.liquidationPx))}</Text>
                        </View>
    
                        <View style={tradeStyles.bottomRow}>
                            <Text style={tradeStyles.label}>Margin Used</Text>
                            <Text style={tradeStyles.value}>${formatNumber(Number(position.marginUsed))}</Text>
                        </View>
                    </View>
                </>
            ) : (
                <Text style={tradeStyles.noPositionText}>No open positions</Text>
            )}
    
            {/* Trade Buttons */}
            <View style={tradeStyles.buttonContainer}>
            <TouchableOpacity 
                style={[tradeStyles.button, { backgroundColor: Colors.RED }]}
                onPress={() => {
                    setIsBuyOrder(false);
                    setIsOrderSheetVisible(true);
                }}
                >
                <Text style={tradeStyles.sellButtonText}>SELL / SHORT</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[tradeStyles.button, { backgroundColor: Colors.BRIGHT_GREEN }]}
                onPress={() => {
                    setIsBuyOrder(true);
                    setIsOrderSheetVisible(true);
                }}
                >
                <Text style={tradeStyles.buyButtonText}>BUY / LONG</Text>
            </TouchableOpacity>
            </View>
            <PlaceOrderSheet
                visible={isOrderSheetVisible}
                onClose={() => setIsOrderSheetVisible(false)}
                ticker={ticker}
                currentPrice={currentPrice}
                position={position}
                isBuy={isBuyOrder}
                maxLev={maxLev}
                szDecimals={szDecimals}
            />
        </LinearGradient>
    );
};

export default Trade;