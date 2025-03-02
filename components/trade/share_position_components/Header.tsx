import { TouchableOpacity, Text, View, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../../styles/colors";
import styles from "../../../styles/share_order";

interface HeaderProps {
    value: boolean,
    onValueChange: (value: boolean) => void,
    onBackPress: () => void,
}

export const Header: React.FC<HeaderProps> = ({
   value,
   onValueChange,
   onBackPress,
}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBackPress}>
                <Ionicons name="chevron-back" size={32} color={Colors.BRIGHT_GREEN} />
            </TouchableOpacity>
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Show $ PNL</Text>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: Colors.DARK_GREEN, true: Colors.BRIGHT_GREEN }}
                />
            </View>
        </View>
    );
}