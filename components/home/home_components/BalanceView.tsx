import React, { useState, useEffect } from 'react';
import { Animated } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import styles from "../styles";
import { useGlobalState } from '../../../context/GlobalStateContext';
import { formatNumber } from '../../../common/helpers';
import { getFontSize } from '../helpers';
import Colors from '../../../styles/colors';
import { HIDDEN_NUMBER } from '../constants';


interface BalanceViewProps {
    onPress: () => void;
    onLongPress: () => void;
    isBalanceHidden: boolean,
}

export const BalanceView: React.FC<BalanceViewProps> = ({
    onPress,
    onLongPress,
    isBalanceHidden,
}) => {
    const { globalState } = useGlobalState();
    const [previousBalance, setPreviousBalance] = useState<number | null>(null);
    const [colorAnim] = useState(new Animated.Value(0));
    const [isIncrease, setIsIncrease] = useState<boolean | null>(null);

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

    const balance = globalState.userState?.perps.marginSummary.accountValue;
    const displayValue = isBalanceHidden ? HIDDEN_NUMBER : "$" + formatNumber(balance, 2);
    
    const dynamicFontSize = getFontSize(displayValue);
    const textColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.FG_1, isIncrease ? Colors.BRIGHT_ACCENT : Colors.RED]
    });

    return (
        <TouchableWithoutFeedback 
            style={styles.balanceContainer}
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={400}
        >
            <Animated.Text style={[
                styles.balanceAmount,
                { 
                    fontSize: dynamicFontSize,
                    color: textColor
                }
            ]}>{displayValue}</Animated.Text>
        </TouchableWithoutFeedback>
    );
}