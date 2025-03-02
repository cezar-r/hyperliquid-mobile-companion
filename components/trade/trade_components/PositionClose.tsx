import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from "react-native";

import styles from "../styles";
import Colors from "../../../styles/colors";
import { useGlobalState } from '../../../context/GlobalStateContext';
import { closeOrder } from '../../../services/hyperliquid/close_order.cjs';
import { deleteLimitOrder } from '../../../services/delete_limit_order';
import { defaultHaptic } from '../../common/HapticTypes';

interface PositionCloseProps {
    ticker: string
}

export const PositionClose: React.FC<PositionCloseProps> = ({
    ticker
}) => {
    const { refreshData } = useGlobalState();
    const [isClosing, setIsClosing] = useState(false);

    return (
        <TouchableOpacity
            style={styles.closeButton}
                onPress={async () => {
                    await defaultHaptic();
                    setIsClosing(true);
                    await closeOrder(ticker);
                    await deleteLimitOrder(ticker, true)
                    await deleteLimitOrder(ticker, false)
                    await refreshData();
                    setIsClosing(false);
                }}
        >
            {isClosing ? (
                <ActivityIndicator color={Colors.FG_1} size="small" />
            ) : (
                <Text style={styles.closeButtonText}>Market Close</Text>
            )}
        </TouchableOpacity>
    );
}