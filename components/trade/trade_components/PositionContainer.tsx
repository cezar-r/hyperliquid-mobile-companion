import { View } from "react-native";
import tradeStyles from "../../../styles/trade_page";
import { PositionRow } from "./PositionRow";
import Colors from "../../../styles/colors";
import { formatNumber, formatPercent } from "../../../common/helpers";
import { EditTpSlRow } from "./EditTpSlRow";

interface PositionContainerProps {
    position: any;
    currentPrice: number;
    tpPrice: string,
    slPrice: string,
    onTpSlModalPress: () => void;
}

export const PositionContainer: React.FC<PositionContainerProps> = ({
    position,
    currentPrice,
    tpPrice,
    slPrice,
    onTpSlModalPress,
}) => {
    return (
        <View style={tradeStyles.tableContainer}>
            <PositionRow
                label={"Leverage"}
                value={String(position.leverage.value) + "x"}
                addlStyle={{ color: Number(position.szi) > 0 ? Colors.BRIGHT_GREEN : Colors.RED }}
            />

            <PositionRow
                label={"Size"}
                value={String(Math.abs(Number(position.szi))) + position.coin}
            />

            <PositionRow
                label={"Position Value"}
                value={"$" + formatNumber(Number(position.positionValue))}
            />

            <PositionRow
                label={"Entry Price"}
                value={"$" + formatNumber(Number(position.entryPx))}
            />

            <PositionRow
                label={"Mark Price"}
                value={"$" + formatNumber(currentPrice)}
            />

            <PositionRow
                label={"PnL"}
                value={"$" + formatNumber(Number(position.unrealizedPnl)) + "(" + formatPercent(Number(position.returnOnEquity)) + ")"}
                addlStyle={{ 
                    color: Number(position.unrealizedPnl) > 0 
                        ? Colors.BRIGHT_GREEN 
                        : Number(position.unrealizedPnl) < 0 
                            ? Colors.RED 
                            : Colors.WHITE 
                }}
            />

            <EditTpSlRow
                label={"TP"}
                price={tpPrice}
                onTpSlModalPress={onTpSlModalPress}
            />

            <EditTpSlRow
                label={"SL"}
                price={slPrice}
                onTpSlModalPress={onTpSlModalPress}
            />

            <PositionRow
                label={"Liquidation Price"}
                value={"$" + formatNumber(Number(position.liquidationPx))}
            />

            <PositionRow
                label={"Margin"}
                value={"$" + formatNumber(Number(position.marginUsed))}
            />

        </View>
    );
}