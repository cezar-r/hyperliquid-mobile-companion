import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';

import styles from "../../../styles/trade_page";
import Colors from "../../../styles/colors";

interface PositionHeader {
    onSharePositionPress: () => void;
}

export const PositionHeader: React.FC<PositionHeader> = ({
    onSharePositionPress
}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <Text style={styles.sectionTitle}>Position</Text>
            <TouchableOpacity 
                style={styles.positionHeader}
                onPress={onSharePositionPress}
            >
                <Ionicons name="share-outline" size={18} color={Colors.BRIGHT_GREEN} />
            </TouchableOpacity>
        </View>
    )
}