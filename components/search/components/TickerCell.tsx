import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { SortType } from './SortHeader';

import styles from "../styles";
import { formatNumber, formatPercent } from "../../../common/helpers";
import { TickerData } from "../../../common/types"
import { Colors } from "../../../styles/colors";

interface TickerCellProps {
    item: TickerData,
    onPress: () => void,
    currentSort: SortType;
}

export const TickerCell: React.FC<TickerCellProps> = ({
    item,
    onPress,
    currentSort
}) => {
    const pctChange24h = (item.price - item.prevDayPx) / (item.prevDayPx);
    
    const getSortValue = () => {
        switch (currentSort) {
            case SortType.VOLUME:
                return `$${formatNumber(item.volume24h, 2)}`;
            case SortType.OPEN_INTEREST:
                return `$${formatNumber(item.openInterest, 2)}`;
            case SortType.CHANGE:
            case SortType.ALPHABETICAL:
            case SortType.LEVERAGE:
                return `${pctChange24h > 0 ? "+" : "-"}${formatPercent(Math.abs(pctChange24h))}`;
            case SortType.FUNDING:
                return `${formatNumber(item.funding*100, 5)}%`;
            default:
                return '';
        }
    };

    const getSortValueColor = () => {
        switch (currentSort) {
            case SortType.VOLUME:
            case SortType.OPEN_INTEREST:
                return Colors.BRIGHT_ACCENT;
            case SortType.FUNDING:
                return item.funding > 0 ? Colors.BRIGHT_ACCENT : Colors.RED;
            default:
                return pctChange24h > 0 ? Colors.BRIGHT_ACCENT : Colors.RED;
        }
    };
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
                            { color: getSortValueColor()}
                        ]}>{getSortValue()}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>
            </View>
        </React.Fragment>
    );
}