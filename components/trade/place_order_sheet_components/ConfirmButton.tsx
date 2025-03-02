import React from "react";
import { Text, ActivityIndicator, Animated, GestureResponderEvent, TouchableOpacity } from "react-native";

import styles from "./styles";
import Colors from "../../../styles/colors";
import { PLACE_ORDER_BUTTON_TEXT } from "./constants";

interface ConfirOrdermButtonProps {
    isBuy: boolean,
    onPressIn: (event: GestureResponderEvent) => void,
    onPressOut: (event: GestureResponderEvent) => void,
    isValidOrder: boolean,
    holdProgress: Animated.Value,
    isPlacing: boolean,
}

export const ConfirmOrderButton: React.FC<ConfirOrdermButtonProps> = ({
    isBuy,
    onPressIn,
    onPressOut,
    isValidOrder,
    holdProgress,
    isPlacing
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.confirmButton, 
                { backgroundColor: isBuy 
                    ? isValidOrder ? Colors.BRIGHT_ACCENT : Colors.ACCENT
                    : isValidOrder ? Colors.RED : Colors.DARK_RED
                }
            ]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
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
                <ActivityIndicator color={isBuy ? Colors.BG_1 : Colors.FG_1} size="small" />
            ) : (
                <Text style={[styles.confirmButtonText, {color: isBuy ? Colors.BG_1 : Colors.FG_1}]}>
                    {PLACE_ORDER_BUTTON_TEXT}
                </Text>
            )}
        </TouchableOpacity>
    );
}