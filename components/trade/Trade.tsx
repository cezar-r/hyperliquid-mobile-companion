import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ActivityIndicator, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalState } from '../../context/GlobalStateContext';
import { LinearGradient } from 'expo-linear-gradient';
import tradeStyles from "../../styles/trade_page";
import PlaceOrderSheet from './PlaceOrderSheet';
import { getLimitOrderTpSlPrice } from '../../services/get_limit_orders';
import { getLimitOrderCloid } from '../../services/get_limit_order_cloid';
import { closeOrder } from '../../services/hyperliquid/close_order.cjs';
import * as Haptics from 'expo-haptics';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { limitTpOrSlOrder } from '../../services/hyperliquid/tp_sl_order.cjs';
import { saveLimitOrderToStorage } from '../../services/save_limit_orders';
import { cancelOrder } from '../../services/hyperliquid/cancel_order.cjs';
import { deleteLimitOrder } from '../../services/delete_limit_order';


import Colors from "../../styles/colors";

const Trade = ({ route, navigation }: any) => {
    const { globalState, refreshData } = useGlobalState();
    const { ticker } = route.params;
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);
    const [isIncrease, setIsIncrease] = useState<boolean | null>(null);
    const [colorAnim] = useState(new Animated.Value(0));
    const [isOrderSheetVisible, setIsOrderSheetVisible] = useState(false);
    const [isBuyOrder, setIsBuyOrder] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const [tpPrice, setTpPrice] = useState('--');
    const [slPrice, setSlPrice] = useState('--');
    const [isTpSlModalVisible, setIsTpSlModalVisible] = useState(false);
    const [tpInput, setTpInput] = useState('');
    const [slInput, setSlInput] = useState('');
    const [setLimitOrder, setSetLimitOrder] = useState(false);


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

    const calculateProfitLoss = (price: string, isTp: boolean) => {
        if (!position || !Number(position.entryPx) || !price) return { percent: 0, value: 0 };
        const priceNum = Number(price);
        const size = Math.abs(Number(position.szi));
        const percent = ((priceNum - Number(position.entryPx)) / Number(position.entryPx)) * 100 * position.leverage.value;
        const value = (priceNum - Number(position.entryPx)) * size;
        const isLong = Number(position.szi) > 0;

        return { 
          percent: isLong ? percent : -percent,
          value: isLong ? value : -value
        };
      };
      
    
    useEffect(() => {
        const fetchLimitOrders = async () => {
            // setSetLimitOrder(false);
            try {
                if (!setLimitOrder) {
                    const orders = await getLimitOrderTpSlPrice(ticker);
                    setTpPrice(orders.tp);
                    setSlPrice(orders.sl);
                    setSetLimitOrder(true);
                }
            } catch (error) {
                console.error("Error fetching limit orders:", error);
            }
        };

        fetchLimitOrders();
    });

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
            maximumFractionDigits: 5
        });
    };

    const formatPercent = (num: number) => {
        return (num * 100).toFixed(2) + '%';
    };

    const submitNewTpSlOrders = async () => {
        if (tpInput === '' && tpPrice !== "--") {
            const cloid = await getLimitOrderCloid(ticker, true);
            await cancelOrder(ticker, cloid);
            await deleteLimitOrder(ticker, true);
        }
        if (slInput === '' && slPrice !== '--') {
            const cloid = await getLimitOrderCloid(ticker, false);
            await cancelOrder(ticker, cloid);
            await deleteLimitOrder(ticker, false);
        }

        const isLong = Number(position.szi) > 0;
        if (isLong && tpInput||
            !isLong && tpInput
        ) {
            if (tpPrice !== '--') {
                const cloid = await getLimitOrderCloid(ticker, true)
                await cancelOrder(ticker, cloid)
                await deleteLimitOrder(ticker, true);
            }
            const tpResponse = await limitTpOrSlOrder(ticker, Number(tpInput), isLong, Math.abs(Number(position.szi)), true);
            await saveLimitOrderToStorage(ticker, tpInput, true, tpResponse.message);
        }

        if (isLong && slInput && Number(slInput) < Number(currentPrice) ||
            !isLong && slInput && Number(slInput) > Number(currentPrice) 
        ) {
            if (slPrice !== '--') {
                const cloid = await getLimitOrderCloid(ticker, false)
                await cancelOrder(ticker, cloid)
                await deleteLimitOrder(ticker, false);
            }
            const slResponse = await limitTpOrSlOrder(ticker, Number(slInput), isLong, Math.abs(Number(position.szi)), false);
            await saveLimitOrderToStorage(ticker, slInput, false, slResponse.message);
        }
    }

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
            
            {position ? (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                        <Text style={tradeStyles.sectionTitle}>Position</Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('SharePosition', { 
                                ticker,
                                entryPrice: Number(position.entryPx),
                                markPrice: currentPrice,
                                pnlPercent: Number(position.returnOnEquity),
                                pnlValue: Number(position.unrealizedPnl),
                                leverage: position.leverage.value,
                                isLong: Number(position.szi) > 0
                            })}
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                paddingHorizontal: 9,
                                paddingVertical: 8,
                                backgroundColor: Colors.DARK_GREEN,
                                borderRadius: 8,
                                marginRight: 16,
                                marginTop: 30,
                                marginBottom: 4,
                            }}
                        >
                            <Ionicons name="share-outline" size={18} color={Colors.BRIGHT_GREEN} />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={tradeStyles.divider}></View> */}
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
                            <Text style={tradeStyles.label}>TP</Text>
                            <TouchableOpacity 
                                style={tradeStyles.valueContainer}
                                onPress={() => {
                                setTpInput(tpPrice !== "--" ? tpPrice : "");
                                setSlInput(slPrice !== "--" ? slPrice : "");
                                setIsTpSlModalVisible(true);
                                }}
                            >
                                <Text style={tradeStyles.value}>
                                {tpPrice !== "--" ? "$" : ""}{tpPrice != "--" ? formatNumber(Number(tpPrice)) : "--"}
                                </Text>
                                <MaterialIcons name="edit" size={16} color={Colors.BRIGHT_GREEN} style={tradeStyles.editIcon} />
                            </TouchableOpacity>
                            </View>

                            <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>SL</Text>
                            <TouchableOpacity 
                                style={tradeStyles.valueContainer}
                                onPress={() => {
                                setTpInput(tpPrice !== "--" ? tpPrice : "");
                                setSlInput(slPrice !== "--" ? slPrice : "");
                                setIsTpSlModalVisible(true);
                                }}
                            >
                                <Text style={tradeStyles.value}>
                                {slPrice !== "--" ? "$" : ""}{slPrice != "--" ? formatNumber(Number(slPrice)) : "--"}
                                </Text>
                                <MaterialIcons name="edit" size={16} color={Colors.BRIGHT_GREEN} style={tradeStyles.editIcon} />
                            </TouchableOpacity>
                        </View>
    
                        <View style={tradeStyles.row}>
                            <Text style={tradeStyles.label}>Liquidation Price</Text>
                            <Text style={tradeStyles.value}>${formatNumber(Number(position.liquidationPx))}</Text>
                        </View>
    
                        <View style={tradeStyles.bottomRow}>
                            <Text style={tradeStyles.label}>Margin</Text>
                            <Text style={tradeStyles.value}>${formatNumber(Number(position.marginUsed))}</Text>
                        </View>

                        <TouchableOpacity 
                            style={tradeStyles.closeButton}
                            onPress={async () => {
                                await Haptics.impactAsync()
                                setIsClosing(true);
                                await closeOrder(ticker);
                                await deleteLimitOrder(ticker, true)
                                await deleteLimitOrder(ticker, false)
                                await refreshData();
                                setIsClosing(false);
                            }}
                        >
                            {isClosing ? (
                                <ActivityIndicator color={Colors.WHITE} size="small" />
                            ) : (
                                <Text style={tradeStyles.closeButtonText}>Market Close</Text>
                            )}
                        </TouchableOpacity>
                    </View>


                </>
            ) : (
                <Text style={tradeStyles.noPositionText}>No open position</Text>
            )}
    
            {/* Trade Buttons */}
            <View style={tradeStyles.buttonContainer}>
            <TouchableOpacity 
                style={[tradeStyles.button, { backgroundColor: Colors.RED }]}
                onPress={async () => {
                    await Haptics.impactAsync(
                        Haptics.ImpactFeedbackStyle.Medium
                    );
                    setIsBuyOrder(false);
                    setIsOrderSheetVisible(true);
                }}
                >
                <Text style={tradeStyles.sellButtonText}>SELL / SHORT</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[tradeStyles.button, { backgroundColor: Colors.BRIGHT_GREEN }]}
                onPress={async () => {
                    await Haptics.impactAsync(
                        Haptics.ImpactFeedbackStyle.Medium
                    );
                    setIsBuyOrder(true);
                    setIsOrderSheetVisible(true);
                }}
                >
                <Text style={tradeStyles.buyButtonText}>BUY / LONG</Text>
            </TouchableOpacity>
            </View>

            {isTpSlModalVisible && (
                <View style={tradeStyles.modalContainer}>
                    <View style={tradeStyles.modalContent}>
                        <View style={tradeStyles.tpslHeaderRow}>
                            <Text style={tradeStyles.headerTitle}>
                                TP/SL for Position
                            </Text>
                            <TouchableOpacity 
                                style={tradeStyles.modalClose}
                                onPress={() => setIsTpSlModalVisible(false)}
                            >
                                <MaterialIcons name="close" size={24} color={Colors.WHITE} />
                            </TouchableOpacity>
                        </View>

                        <View style={tradeStyles.tpslContainer}>
                            <View style={tradeStyles.tpslRow}>

                            {/* TP ROW*/}
                            <TextInput
                                style={tradeStyles.priceInput}
                                keyboardType="numeric"
                                value={tpInput}
                                onChangeText={setTpInput}
                                placeholder="TP"
                                placeholderTextColor={Colors.BRIGHT_GREEN}
                            />
                            <Text style={[
                                tradeStyles.profitValue,
                                { color: calculateProfitLoss(tpInput, true).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                            ]}>
                                {calculateProfitLoss(tpInput, true).value >= 0 ? '+' : '-'}${Math.abs(calculateProfitLoss(tpInput, true).value).toFixed(2)}
                            </Text>
                            <Text style={[
                                tradeStyles.percentChange,
                                { color: calculateProfitLoss(tpInput, true).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                            ]}>
                                {calculateProfitLoss(tpInput, true).value >= 0 ? '+' : '-'}{Math.abs(calculateProfitLoss(tpInput, true).percent).toFixed(2)}%
                            </Text>
                            </View>

                            <View style={tradeStyles.tpslRow}>

                            {/* SL ROW*/}
                            <TextInput
                                style={tradeStyles.priceInput}
                                keyboardType="numeric"
                                value={slInput}
                                onChangeText={setSlInput}
                                placeholder="SL"
                                placeholderTextColor={Colors.BRIGHT_GREEN}
                            />
                            <Text style={[
                                tradeStyles.profitValue,
                                { color: calculateProfitLoss(slInput, false).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                            ]}>
                                {calculateProfitLoss(slInput, false).value >= 0 ? '+' : '-'}${Math.abs(calculateProfitLoss(slInput, false).value).toFixed(2)}
                            </Text>
                            <Text style={[
                                tradeStyles.percentChange,
                                { color: calculateProfitLoss(slInput, false).value >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                            ]}>
                                {calculateProfitLoss(slInput, false).percent.toFixed(2)}%
                            </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={tradeStyles.submitButton}
                            onPress={async () => {
                                await submitNewTpSlOrders();
                                setIsTpSlModalVisible(false);
                            }}
                        >
                            <Text style={tradeStyles.submitButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
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