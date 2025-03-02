import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

import styles from "./styles";
import Colors from "../../../styles/colors";

interface DollarSliderProps {
    dollarAmount: number,
    tradeableBalance: number,
    minAmount: number,
    step: number,
    onValueChange: (value: number) => void;
    isBuy: boolean
}

export const DollarSlider: React.FC<DollarSliderProps> = ({
    dollarAmount,
    tradeableBalance,
    minAmount,
    step,
    onValueChange,
    isBuy,
}) => {
    return (
        <View style={styles.bottomSection}>
            <Text style={styles.label}>
                Amount: ${dollarAmount.toFixed(2)} / Max: ${(tradeableBalance * 0.99).toFixed(2)}
            </Text>
            <Slider
                minimumValue={minAmount}
                maximumValue={tradeableBalance * 0.99}
                step={step}
                value={dollarAmount}
                onValueChange={onValueChange}
                minimumTrackTintColor={isBuy ? Colors.BRIGHT_ACCENT : Colors.RED}
                maximumTrackTintColor={Colors.FG_2}
            />
        </View>
    );
}