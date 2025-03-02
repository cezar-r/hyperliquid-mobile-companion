import React, { forwardRef } from "react";
import ViewShot from "react-native-view-shot"
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

import styles from "../../../styles/share_order";
import Colors from "../../../styles/colors"
import { ENTRY_PRICE_LABEL, MARK_PRICE_LABEL, URL } from "./constants";

interface ShareableAreaProps {
    ticker: string,
    isLong: boolean,
    leverage: number,
    showDollarPnl: boolean,
    pnlPercent: number,
    pnlStr: string,
    pnlPctStr: string,
    entryPrice: number,
    markPrice: number,
}

export const ShareableArea = forwardRef<ViewShot, ShareableAreaProps>((
    {
        ticker,
        isLong,
        leverage,
        showDollarPnl,
        pnlPercent,
        pnlStr,
        pnlPctStr,
        entryPrice,
        markPrice,
    },
    ref
) => {
    return (
        <ViewShot 
            ref={ref}
            style={{ flex: 1 }}
            options={{ 
                format: "jpg",
                quality: 1,
                result: "tmpfile",
                fileName: `${ticker}_position_${new Date().toISOString().split('T')[0]}_${Math.random().toString(36).substring(2, 8)}.jpg`,
            }}
        >
            <LinearGradient
                colors={[Colors.DARK_DARK_GREEN, Colors.DARK_GREEN, Colors.GREEN]}
                locations={[0, 0.5, .99]}
                start={{ x: .5, y: 1 }}
                end={{ x: .5, y: 0 }}
                style={{ flex: 1, padding: 20 }}
            >
                <View style={styles.background}>
                    <View style={styles.tickerRow}>
                        <Text style={styles.tickerLabel}>{ticker}</Text>

                        <View style={[
                            styles.leverageContainer,
                            { backgroundColor: isLong ? Colors.GREEN : Colors.MAROON }
                        ]}>
                            <Text style={[
                                styles.leverageLabel,
                                { color: isLong ? Colors.BRIGHT_GREEN : Colors.PINK }, 
                            ]}>
                                {isLong ? "Long" : "Short"} {leverage}X
                            </Text>
                        </View>
                    </View>
                    
                    <Text style={[
                        styles.pnlContainer,
                        { color: pnlPercent >= 0 ? Colors.BRIGHT_GREEN : Colors.RED },
                    ]}>{showDollarPnl ? pnlStr : pnlPctStr}</Text>

                    <View style={styles.priceRow}>
                        <View style={styles.entryColumn}>
                            <Text style={styles.label}>{ENTRY_PRICE_LABEL}</Text>
                                <Text style={styles.value}>${entryPrice}</Text>
                        </View>

                        <View style={styles.markColumn}>
                            <Text style={styles.label}>{MARK_PRICE_LABEL}</Text>
                                <Text style={styles.value}>${markPrice}</Text>
                        </View>

                    </View>

                    <View style={styles.urlContainer}>
                        <Text style={styles.urlText}>{URL}</Text>
                    </View>
                </View>
            </LinearGradient>
        </ViewShot>
    );
});