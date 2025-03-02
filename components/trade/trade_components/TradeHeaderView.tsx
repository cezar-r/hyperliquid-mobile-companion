import React, { useState, useEffect } from 'react';

import { View, Text, Animated } from "react-native"

import styles from "../styles";
import { formatNumber } from "../../../common/helpers";
import Colors from "../../../styles/colors";


interface TradeHeaderViewProps {
    ticker: string,
    currentPrice: number
    price24Change: number,
    price24ChangePct: number,
}

export const TradeHeaderView: React.FC<TradeHeaderViewProps> = ({
    ticker,
    currentPrice,
    price24Change,
    price24ChangePct
}) => {

    const [isIncrease, setIsIncrease] = useState<boolean | null>(null);
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);
    const [colorAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (previousPrice === null) {
            setPreviousPrice(currentPrice);
            return;
        }
        
        if (currentPrice !== previousPrice) {
            setIsIncrease(currentPrice > previousPrice);
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
            setPreviousPrice(currentPrice);
        }
    }, [currentPrice]);

    const textColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.FG_1, isIncrease ? Colors.BRIGHT_ACCENT : Colors.RED]
    });

    return (
        <View style={styles.header}>
            <Text style={styles.ticker}>{ticker}</Text>
            <Animated.Text style={[styles.price, { color: textColor }]}>
                    ${formatNumber(currentPrice, 5)}
            </Animated.Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text
                    style={[
                        styles.percentageChange,
                        {
                        color: price24ChangePct >= 0 ? Colors.BRIGHT_ACCENT : Colors.RED,
                        },
                    ]}>
                    {price24ChangePct >= 0 ? '▲ ' : '▼ '}
                    ${formatNumber(Math.abs(price24Change))} ({price24ChangePct.toFixed(2)}%)
                </Text>
                <Text style={styles.percetangeLabel}>
                    24h
                </Text>
            </View>
        </View>
    );
}