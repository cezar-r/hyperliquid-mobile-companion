import { Text, View, TextStyle } from "react-native"
import styles from "../styles"

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
    let valueStyle: TextStyle[] = [styles.value];
    if (addlStyle) {
        valueStyle.push(addlStyle)
    }

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={valueStyle}>{value}</Text>
        </View>
    )
}