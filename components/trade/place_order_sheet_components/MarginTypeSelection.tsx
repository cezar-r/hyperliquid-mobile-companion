import { Switch, View, Text } from "react-native";

import styles from "../../../styles/place_order_sheet";
import Colors from "../../../styles/colors";
import { MARGIN_SELECTION_TEXT } from "./constants";

interface MarginTypeSelectionProps {
    isCross: boolean,
    toggleCrossMargin: (value: boolean) => void;
}

export const MarginTypeSelection: React.FC<MarginTypeSelectionProps> = ({
    isCross,
    toggleCrossMargin,
}) => {
    return (
        <View style={styles.marginTypeSection}>
            <Switch
                value={isCross}
                onValueChange={toggleCrossMargin}
                trackColor={{ false: Colors.GRAY, true: Colors.BRIGHT_GREEN }}
                thumbColor={isCross ? Colors.WHITE : Colors.LIGHT_GRAY}
                style={{ marginRight: 10 }}
            />
            <Text style={styles.marginLabel}>{MARGIN_SELECTION_TEXT}</Text>
        </View>
    );
}