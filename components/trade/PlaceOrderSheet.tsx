import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from "../../styles/colors";
import styles from "../../styles/place_order_sheet";
import { placeOrder } from '../../services/hyperliquid/place_order.cjs';

import { useGlobalState } from '../../context/GlobalStateContext';

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
  const { globalState } = useGlobalState();
  const [leverage, setLeverage] = useState(position?.leverage.value || 1);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [holdProgress] = useState(new Animated.Value(0));
  const pan = useRef(new Animated.Value(0)).current;
  const [isValidOrder, setIsValidOrder] = useState(false);
  const tradeableBalance = globalState.userState?.perps.withdrawable;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        }
        Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
      },
    })
  ).current;

  useEffect(() => {
    setIsValidOrder(dollarAmount*leverage > 10);
  }, [dollarAmount])

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
    console.log("Placing order");
    placeOrder(ticker, isBuy, orderSize, currentPrice, leverage)
    // console.log('Order placed!');
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.sheet,
            { transform: [{ translateY: pan }] }
          ]}
          {...panResponder.panHandlers}
        >
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
                step={1} // Changed from 0.1 to 1
                value={leverage}
                onValueChange={(value) => setLeverage(Math.round(value))} // Round to nearest integer
                minimumTrackTintColor={isBuy ? Colors.BRIGHT_GREEN : Colors.RED}
                maximumTrackTintColor={Colors.GRAY}
                />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>
              Amount: ${dollarAmount.toFixed(2)} / Max: ${(tradeableBalance * 0.99).toFixed(2)}
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={tradeableBalance * 0.99}
              step={.01}
              value={dollarAmount}
              onValueChange={setDollarAmount}
              minimumTrackTintColor={isBuy ? Colors.BRIGHT_GREEN : Colors.RED}
              maximumTrackTintColor={Colors.GRAY}
            />
          </View>

          <View style={styles.detailsContainer}>
            <DetailItem label="Order Value" value={`$${orderValue.toFixed(2)}`} />
            <DetailItem label="Order Size" value={`${orderSize} ${ticker}`} />
            <DetailItem label="Margin Required" value={`$${marginRequired.toFixed(2)}`} />
          </View>

          <TouchableOpacity 
            style={[
              styles.confirmButton, 
              { backgroundColor: isValidOrder 
                    ? Colors.BRIGHT_GREEN : Colors.GREEN }
            ]}
            onPressIn={startHold}
            onPressOut={cancelHold}
            activeOpacity={0.8}
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
            <Text style={styles.confirmButtonText}>
              Place Order
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
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