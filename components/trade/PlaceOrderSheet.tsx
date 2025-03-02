import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, PanResponder, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from "../../styles/colors";
import styles from "../../styles/place_order_sheet";
import { lightHaptic, selectionHaptic, successHaptic } from '../common/HapticTypes';
import { placeOrder } from '../../services/hyperliquid/place_order.cjs';
import { useGlobalState } from '../../context/GlobalStateContext';
import { PlaceOrderHeader } from './place_order_sheet_components/HeaderView';
import { LeverageSlider } from './place_order_sheet_components/LeverageSlider';
import { DollarSlider } from './place_order_sheet_components/DollarSlider';
import { TpSlRow } from './place_order_sheet_components/TpSlInputRow';
import { MarginTypeSelection } from './place_order_sheet_components/MarginTypeSelection';
import { OrderDetails } from './place_order_sheet_components/OrderDetails';
import { ConfirmOrderButton } from './place_order_sheet_components/ConfirmButton';
import { handleTpSlOrders } from './helpers';

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
            await handleTpSlOrders(
              ticker,
              takeProfitPrice,
              stopLossPrice,
              isBuy,
              currentPrice,
              Number(orderSize)
            );
            await successHaptic();
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

                <PlaceOrderHeader
                  ticker={ticker}
                  isBuy={isBuy}
                />

                <LeverageSlider
                  position={position}
                  leverage={leverage}
                  minLeverage={minLeverage}
                  maxLeverage={maxLev}
                  step={1}
                  onValueChange={async (value) => {
                      setLeverage(Math.round(value));
                      await lightHaptic();
                  }}
                  isBuy={isBuy}
                />

                <DollarSlider
                  dollarAmount={dollarAmount}
                  tradeableBalance={tradeableBalance}
                  minAmount={0}
                  step={.01}
                  onValueChange={async (value) => {
                      setDollarAmount(value);
                      await selectionHaptic();
                  }}
                  isBuy={isBuy}
                />

                <TpSlRow
                  value={takeProfitPrice}
                  placeholder={"TP"}
                  onChangeText={setTakeProfitPrice}
                  pctChange={tpCalculations.percentChange.toFixed(2)}
                  dollarChangeColor={tpCalculations.profit >= 0 ? Colors.BRIGHT_GREEN : Colors.RED}
                  dollarChange={Math.abs(tpCalculations.profit).toFixed(2)}
                />

                <TpSlRow
                  value={stopLossPrice}
                  placeholder={"SL"}
                  onChangeText={setStopLossPrice}
                  pctChange={slCalculations.percentChange.toFixed(2)}
                  dollarChangeColor={slCalculations.profit >= 0 ? Colors.BRIGHT_GREEN : Colors.RED}
                  dollarChange={Math.abs(slCalculations.profit).toFixed(2)}
                />

                <MarginTypeSelection
                  isCross={isCross}
                  toggleCrossMargin={toggleCrossMargin}
                />

                <OrderDetails
                  orderValue={orderValue.toFixed(2)}
                  orderSize={orderSize}
                  ticker={ticker}
                  marginRequired={marginRequired.toFixed(2)}
                />

                <ConfirmOrderButton
                  isBuy={isBuy}
                  onPressIn={startHold}
                  onPressOut={cancelHold}
                  isValidOrder={isValidOrder}
                  holdProgress={holdProgress}
                  isPlacing={isPlacing}
                />

                </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
};

export default PlaceOrderSheet;