import { Switch, View, Text } from "react-native";

import styles from "./styles";
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
                trackColor={{ false: Colors.FG_2, true: Colors.BRIGHT_ACCENT }}
                thumbColor={isCross ? Colors.FG_1 : Colors.FG_3}
                style={{ marginRight: 10 }}
            />
            <Text style={styles.marginLabel}>{MARGIN_SELECTION_TEXT}</Text>
        </View>
    );
}