import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Switch, TextInput, Animated, PanResponder, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from "../../styles/colors";
import styles from "../../styles/place_order_sheet";
import { placeOrder } from '../../services/hyperliquid/place_order.cjs';
import { limitTpOrSlOrder } from '../../services/hyperliquid/tp_sl_order.cjs';
import { saveLimitOrderToStorage } from '../../services/save_limit_orders';

import { useGlobalState } from '../../context/GlobalStateContext';
import * as Haptics from 'expo-haptics';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DRAG_THRESHOLD = 50;

interface PlaceOrderSheetProps {
    visible: boolean;
    onClose: () => void;
    ticker: string;
    currentPrice: number;
    position?: {
      leverage: {
        value: number;
      };
    };
    isBuy: boolean;
    maxLev: number;
    szDecimals: number;
}

const PlaceOrderSheet: React.FC<PlaceOrderSheetProps> = ({
    visible,
    onClose,
    ticker,
    currentPrice,
    position,
    isBuy,
    maxLev,
    szDecimals
}) => {
    const { globalState, refreshData } = useGlobalState();
    const [leverage, setLeverage] = useState(position?.leverage.value || 1);
    const [dollarAmount, setDollarAmount] = useState(0);
    const [isCross, setIsCross] = useState(false);
    const [holdProgress] = useState(new Animated.Value(0));
    const [takeProfitPrice, setTakeProfitPrice] = useState('');
    const [stopLossPrice, setStopLossPrice] = useState('');
    const [isValidOrder, setIsValidOrder] = useState(false);
    const [isPlacing, setIsPlacing] = useState(false);
    const tradeableBalance = globalState.userState?.perps.withdrawable;
    const dragY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadCrossMargin = async () => {
          try {
            const savedCross = await AsyncStorage.getItem('isCrossMargin');
            if (savedCross !== null) {
              setIsCross(JSON.parse(savedCross));
            }
          } catch (error) {
            return;
          }
        };
        loadCrossMargin();
    }, []);

    useEffect(() => {
      if (visible) {
          dragY.setValue(0);
      }
  }, [visible]);
    
    const toggleCrossMargin = async (value: boolean) => {
        setIsCross(value);
        try {
          await AsyncStorage.setItem('isCrossMargin', JSON.stringify(value));
        } catch (error) {
          console.error('Error saving cross margin preference:', error);
        }
    };
    
    const calculateProfitLoss = (targetPrice: string): { percentChange: number, profit: number } => {
        if (!targetPrice || isNaN(Number(targetPrice))) {
          return { percentChange: 0, profit: 0 };
        }
    
        const priceChange = ((Number(targetPrice) - currentPrice) / currentPrice) * 100;
        const leveragedChange = priceChange * leverage * (isBuy ? 1 : -1);
        const profit = (dollarAmount * leveragedChange) / 100;
    
        return {
          percentChange: leveragedChange,
          profit: profit
        };
    };
    
    const tpCalculations = calculateProfitLoss(takeProfitPrice);
    const slCalculations = calculateProfitLoss(stopLossPrice);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                dragY.stopAnimation();
                dragY.extractOffset();
            },
            onPanResponderMove: Animated.event(
                [null, { dy: dragY }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (_, gestureState) => {
                const { dy, vy } = gestureState;
                dragY.flattenOffset();

                if (dy > DRAG_THRESHOLD || vy > 0.5) {
                    Animated.spring(dragY, {
                        toValue: SCREEN_HEIGHT,
                        tension: 65,
                        friction: 11,
                        useNativeDriver: false
                    }).start(onClose);
                } else {
                    Animated.spring(dragY, {
                        toValue: 0,
                        tension: 65,
                        friction: 11,
                        useNativeDriver: false
                    }).start();
                }
            }
        })
    ).current;

    useEffect(() => {
        setIsValidOrder(dollarAmount*leverage > 10);
    }, [dollarAmount]);

    if (!visible) return null;

    const calculateOrderDetails = () => {
        const orderValue = dollarAmount * leverage;
        const orderSize = (orderValue / currentPrice).toFixed(szDecimals);
        const marginRequired = dollarAmount;

        return {
            orderValue,
            orderSize,
            marginRequired
        };
    };

    const startHold = () => {
        Animated.timing(holdProgress, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    const { orderValue, orderSize, marginRequired } = calculateOrderDetails();
    const minLeverage = position?.leverage.value || 1;

    const cancelHold = async () => {
        holdProgress.setValue(0);
        setIsPlacing(true);
        const orderResponse = await placeOrder(ticker, isBuy, orderSize, leverage, isCross);
        setIsPlacing(false);
        if (orderResponse.status_code === 200) {
            if (takeProfitPrice !== null && (
                isBuy && Number(takeProfitPrice) > currentPrice ||
                !isBuy && Number(takeProfitPrice) < currentPrice
            )) {
                const tpResponse = await limitTpOrSlOrder(ticker, takeProfitPrice, isBuy, orderSize, true);
                await saveLimitOrderToStorage(ticker, takeProfitPrice, true, tpResponse.message);
            } 
            if (stopLossPrice !== null && (
                isBuy && Number(stopLossPrice) < currentPrice ||
                !isBuy && Number(stopLossPrice) > currentPrice
            )) {
                const slResponse = await limitTpOrSlOrder(ticker, stopLossPrice, isBuy, orderSize, false);
                await saveLimitOrderToStorage(ticker, stopLossPrice, false, slResponse.message);
            }
            await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
            await refreshData();
            onClose();
        } else {
            console.error("Failed placing order");
        }
    };

    return (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlayBackground} />
            </TouchableWithoutFeedback>
            
            <Animated.View 
                style={[
                    styles.sheet,
                    { 
                        transform: [{ 
                            translateY: dragY.interpolate({
                                inputRange: [0, SCREEN_HEIGHT],
                                outputRange: [0, SCREEN_HEIGHT]
                            })
                        }]
                    }
                ]}
                {...panResponder.panHandlers}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <View style={styles.dragIndicator} />
                
                <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>
                        {isBuy ? 'Buy / Long' : 'Sell / Short'} {ticker}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>
                        Leverage: {leverage}x
                        {position && ` (Current: ${position.leverage.value}x)`}
                    </Text>
                    <Slider
                        minimumValue={minLeverage}
                        maximumValue={maxLev}
                        step={1}
                        value={leverage}
                        onValueChange={(value) => {
                            setLeverage(Math.round(value));
                            Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light
                            );
                        }}
                        minimumTrackTintColor={isBuy ? Colors.BRIGHT_GREEN : Colors.RED}
                        maximumTrackTintColor={Colors.GRAY}
                        style={{ height: 1 }}
                    />
                </View>

                <View style={styles.bottomSection}>
                    <Text style={styles.label}>
                        Amount: ${dollarAmount.toFixed(2)} / Max: ${(tradeableBalance * 0.99).toFixed(2)}
                    </Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={tradeableBalance * 0.99}
                        step={.01}
                        value={dollarAmount}
                        onValueChange={async (value) => {
                            setDollarAmount(value);
                            Haptics.selectionAsync();
                        }}
                        minimumTrackTintColor={isBuy ? Colors.BRIGHT_GREEN : Colors.RED}
                        maximumTrackTintColor={Colors.GRAY}
                    />
                </View>

                <View style={styles.tpslContainer}>
                    <View style={styles.tpslRow}>
                        <TextInput
                            style={styles.priceInput}
                            keyboardType="numeric"
                            value={takeProfitPrice}
                            onChangeText={setTakeProfitPrice}
                            placeholder="TP"
                            placeholderTextColor={Colors.WHITE}
                        />
                        <Text style={styles.percentChange}>
                            {tpCalculations.percentChange.toFixed(2)}%
                        </Text>
                        <Text style={[styles.profitValue, { color: tpCalculations.profit >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }]}>
                            ${Math.abs(tpCalculations.profit).toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={styles.tpslContainer}>
                    <View style={styles.tpslRow}>
                        <TextInput
                            style={styles.priceInput}
                            keyboardType="numeric"
                            value={stopLossPrice}
                            onChangeText={setStopLossPrice}
                            placeholder="SL"
                            placeholderTextColor={Colors.WHITE}
                        />
                        <Text style={styles.percentChange}>
                            {slCalculations.percentChange.toFixed(2)}%
                        </Text>
                        <Text style={[styles.profitValue, { color: slCalculations.profit >= 0 ? Colors.BRIGHT_GREEN : Colors.RED }]}>
                            ${Math.abs(slCalculations.profit).toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={styles.marginTypeSection}>
                    <Switch
                        value={isCross}
                        onValueChange={toggleCrossMargin}
                        trackColor={{ false: Colors.GRAY, true: Colors.BRIGHT_GREEN }}
                        thumbColor={isCross ? Colors.WHITE : Colors.LIGHT_GRAY}
                        style={{ marginRight: 10 }}  // Add spacing between switch and text
                    />
                    <Text style={styles.marginLabel}>Cross Margin</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <DetailItem label="Order Value" value={`$${orderValue.toFixed(2)}`} />
                    <DetailItem label="Order Size" value={`${orderSize} ${ticker}`} />
                    <DetailItem label="Margin Required" value={`$${marginRequired.toFixed(2)}`} />
                </View>

                <TouchableOpacity 
                    style={[
                        styles.confirmButton, 
                        { backgroundColor: isBuy 
                            ? isValidOrder ? Colors.BRIGHT_GREEN : Colors.GREEN
                            : isValidOrder ? Colors.RED : Colors.DARK_RED
                        }
                    ]}
                    onPressIn={startHold}
                    onPressOut={cancelHold}
                    activeOpacity={0.8}
                    disabled={isPlacing}
                >
                    <Animated.View 
                        style={[
                            styles.progressBar,
                            { width: holdProgress.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                            })}
                        ]}
                    />
                    {isPlacing ? (
                        <ActivityIndicator color={isBuy ? Colors.BLACK : Colors.WHITE} size="small" />
                    ) : (
                        <Text style={[styles.confirmButtonText, {color: isBuy ? Colors.BLACK : Colors.WHITE}]}>
                            Place Order
                        </Text>
                    )}
                </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
};

interface DetailItemProps {
    label: string;
    value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

export default PlaceOrderSheet;