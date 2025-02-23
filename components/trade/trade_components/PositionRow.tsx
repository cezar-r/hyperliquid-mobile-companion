import { Text, View, TextStyle } from "react-native"
import tradeStyles from "../../../styles/trade_page"

interface PositionRowProps {
    label: string,
    value: string | number,
    addlStyle?: TextStyle | null
}

export const PositionRow: React.FC<PositionRowProps> = ({
    label,
    value,
    addlStyle = null,
}) => {
    let valueStyle: TextStyle[] = [tradeStyles.value];
    if (addlStyle) {
        valueStyle.push(addlStyle)
    }

    return (
        <View style={tradeStyles.row}>
            <Text style={tradeStyles.label}>{label}</Text>
            <Text style={valueStyle}>{value}</Text>
        </View>
    )
}