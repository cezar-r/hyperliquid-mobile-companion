import { View, Text, ScrollView, RefreshControl, Animated, TouchableOpacity,ActivityIndicator } from 'react-native';

import styles from "../../../styles/home_page";
import { useGlobalState } from '../../../context/GlobalStateContext';
import { formatNumber, formatPercent, getTickerUniverseIndex } from '../../../common/helpers';
import { HIDDEN_NUMBER } from '../constants';
import Colors from '../../../styles/colors';

interface PositionCellProps {
    item: any;
    index: any;
    isBalanceHidden: boolean;
    onCellPress: (ticker: string) => void;
}

export const PositionCell :React.FC<PositionCellProps> =({
    item,
    index,
    isBalanceHidden,
    onCellPress,
}) => {
    const { globalState } = useGlobalState();

    const position = item.position;
    const ticker = position.coin;
    const tickerMetaInfo = globalState.perpsMeta?.perpsMeta[1][getTickerUniverseIndex(ticker, globalState.perpsMeta?.perpsMeta[0].universe)]

    const leverage = position.leverage.value;
    const isLong = position.szi > 0;
    const price = Number(tickerMetaInfo.markPx);
    const positionValue = formatNumber(Number(position.positionValue), 2);
    const pnl = Number(position.unrealizedPnl);

    const prevDayPrice = Number(tickerMetaInfo.prevDayPx);
    const price24Change = price-prevDayPrice;
    const price24ChangePct = (((price24Change)/prevDayPrice));


    return (
        <TouchableOpacity
            key={index}
            style={styles.positionCell}
            onPress={() => onCellPress(ticker)}
        >
            <View style={styles.leftSide}>
                <View style={styles.tickerContainer}>
                    <Text style={styles.ticker}>{ticker}</Text>
                    <Text style={[
                        styles.leverage,
                        { color: isLong ? Colors.BRIGHT_GREEN : Colors.RED }
                    ]}>{leverage}x</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.size}>${formatNumber(price)}</Text>
                    <Text style={[
                                styles.priceChange,
                                { color: price24ChangePct > 0 ? Colors.BRIGHT_GREEN : Colors.RED }
                            ]}>{price24ChangePct > 0 ? "+" : "-"}{formatPercent(Math.abs(price24ChangePct))}</Text>
                    </View>
                </View>
            <View style={styles.rightSide}>
                <Text style={styles.price}>{isBalanceHidden ? HIDDEN_NUMBER : "$" + positionValue}</Text>
                <Text style={[
                    styles.pnl,
                    { 
                        color: isBalanceHidden ? Colors.WHITE : 
                            pnl > 0 ? Colors.BRIGHT_GREEN : 
                                pnl < 0 ? Colors.RED : 
                                Colors.WHITE 
                    }
                ]}>{isBalanceHidden ? HIDDEN_NUMBER : pnl > 0 ? '+' : '-'}{isBalanceHidden ? "" : "$" + formatNumber(Math.abs(pnl), 2)}</Text>
            </View>
        </TouchableOpacity>
    )
}