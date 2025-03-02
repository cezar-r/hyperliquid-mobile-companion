import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';

import styles from "../styles";
import Colors from "../../../styles/colors";
import { ShareButtonicon } from "../../common/icons/ShareButtonIcon";

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
                <ShareButtonicon/>
            </TouchableOpacity>
        </View>
    )
}