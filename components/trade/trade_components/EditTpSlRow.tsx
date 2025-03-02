import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from "../styles";
import { formatNumber } from "../../../common/helpers";
import Colors from "../../../styles/colors";

interface EditTpSlRowProps {
    label: string,
    price: string,
    onTpSlModalPress: () => void;
}

export const EditTpSlRow: React.FC<EditTpSlRowProps> = ({
    label,
    price,
    onTpSlModalPress
}) => {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            
            <TouchableOpacity
                style={styles.valueContainer}
                onPress={onTpSlModalPress}
            >
                <Text style={styles.value}>
                    {price !== "--" ? "$" : ""}{price != "--" ? formatNumber(Number(price)) : "--"}
                </Text>
                <MaterialIcons name="edit" size={16} color={Colors.BRIGHT_ACCENT} style={styles.editIcon} />
            </TouchableOpacity>
        </View>
    )
}