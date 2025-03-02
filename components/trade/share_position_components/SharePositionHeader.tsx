import { Text, View, Switch } from "react-native";

import Colors from "../../../styles/colors";
import styles from "./styles";
import { BackArrow } from "../../common/icons/BackArrowIcon";

interface HeaderProps {
    value: boolean,
    onValueChange: (value: boolean) => void,
    onBackPress: () => void,
}

export const SharePositionHeader: React.FC<HeaderProps> = ({
   value,
   onValueChange,
   onBackPress,
}) => {
    return (
        <View style={styles.header}>
            <BackArrow onPress={onBackPress}/>
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Show $ PNL</Text>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: Colors.DARK_ACCENT, true: Colors.BRIGHT_ACCENT }}
                />
            </View>
        </View>
    );
}