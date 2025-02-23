import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import tradeStyles from "../../../styles/trade_page";
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
        <View style={tradeStyles.row}>
            <Text style={tradeStyles.label}>{label}</Text>
            
            <TouchableOpacity
                style={tradeStyles.valueContainer}
                onPress={onTpSlModalPress}
            >
                <Text style={tradeStyles.value}>
                    {price !== "--" ? "$" : ""}{price != "--" ? formatNumber(Number(price)) : "--"}
                </Text>
                <MaterialIcons name="edit" size={16} color={Colors.BRIGHT_GREEN} style={tradeStyles.editIcon} />
            </TouchableOpacity>
        </View>
    )
}