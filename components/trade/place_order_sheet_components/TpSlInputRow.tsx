import { TextInput, View, Text } from "react-native"

import styles from "./styles"
import Colors from "../../../styles/colors"

interface TpSlRowProps {
    value: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    pctChange: string,
    dollarChangeColor: Colors
    dollarChange: string
}

export const TpSlRow: React.FC<TpSlRowProps> = ({
    value,
    placeholder,
    onChangeText,
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
                    placeholderTextColor={Colors.FG_1}
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