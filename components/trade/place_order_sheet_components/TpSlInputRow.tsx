import { TextInput, View, Text } from "react-native"

import styles from "../../../styles/place_order_sheet"
import Colors from "../../../styles/colors"

interface TpSlRowProps {
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    pctChange: string,
    dollarChangeColor: Colors
    dollarChange: string
}

export const TpSlRow: React.FC<TpSlRowProps> = ({
    value,
    onChangeText,
    placeholder,
    pctChange,
    dollarChangeColor,
    dollarChange
}) => {
    return (
        <View style={styles.tpslContainer}>
            <View style={styles.tpslRow}>
                <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.WHITE}
                />
                <Text style={styles.percentChange}>
                    {pctChange}%
                </Text>
                <Text style={[styles.profitValue, { color: dollarChangeColor }]}>
                    ${dollarChange}
                </Text>
            </View>
        </View>
    );
}