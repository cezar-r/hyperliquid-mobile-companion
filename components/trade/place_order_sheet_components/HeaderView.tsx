import { View, Text } from "react-native";
import styles from "./styles";
import { BUY_HEADER_TEXT, SELL_HEADER_TEXT } from "./constants";

interface PlaceOrderHeaderProps {
    ticker: string,
    isBuy: boolean,
}

export const PlaceOrderHeader: React.FC<PlaceOrderHeaderProps> = ({
    ticker,
    isBuy
}) => {
    return (
        <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>
                {isBuy ? BUY_HEADER_TEXT : SELL_HEADER_TEXT} {ticker}
            </Text>
        </View>
    );
}
