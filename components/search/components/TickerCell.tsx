import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../../styles/search_page";
import { formatNumber, formatPercent } from "../../../common/helpers";
import { TickerData } from "../../../common/types"
import { Colors } from "../../../styles/colors";

interface TickerCellProps {
    item: TickerData,
    onPress: () => void,
}

export const TickerCell: React.FC<TickerCellProps> = ({
    item,
    onPress
}) => {
    const pctChange24h = (item.price - item.prevDayPx) / (item.prevDayPx);
    return (
        <React.Fragment key={item.ticker}>
            <View>
                <TouchableOpacity 
                    style={styles.tickerCell}
                    onPress={onPress}
                >
                    <View style={styles.tickerContainer}>
                        <Text style={styles.tickerSymbol}>{item.ticker}</Text>
                        <Text style={styles.leverage}>{item.maxLev}x</Text>
                    </View>
                    <View style={styles.tickerContainer}>
                        <Text style={styles.tickerPrice}>${formatNumber(item.price, 5)}</Text>
                        <Text style={[
                            styles.pctChange,
                            { color: pctChange24h > 0 ? Colors.BRIGHT_GREEN : Colors.RED}
                        ]}>{pctChange24h > 0 ? "+" : "-"}{formatPercent(Math.abs(pctChange24h))}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>
            </View>
        </React.Fragment>
    );
}