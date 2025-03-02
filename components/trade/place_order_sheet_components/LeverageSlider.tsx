import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

import styles from "../../../styles/place_order_sheet";
import Colors from "../../../styles/colors";
import { LEVERAGE_SLIDER_TEXT } from "./constants";

interface LeverageSliderProps {
    position: any,
    leverage: number,
    minLeverage: number,
    maxLeverage: number,
    step: number,
    onValueChange: (value: number) => void;
    isBuy: boolean
}

export const LeverageSlider: React.FC<LeverageSliderProps> = ({
    position,
    leverage,
    minLeverage,
    maxLeverage,
    step,
    onValueChange,
    isBuy,
}) => {
    return (
        <View style={styles.section}>
            <Text style={styles.label}>
                {LEVERAGE_SLIDER_TEXT}{leverage}x
                {position && ` (Current: ${position.leverage.value}x)`}
            </Text>
            <Slider
                minimumValue={minLeverage}
                maximumValue={maxLeverage}
                step={step}
                value={leverage}
                onValueChange={onValueChange}
                minimumTrackTintColor={isBuy ? Colors.BRIGHT_GREEN : Colors.RED}
                maximumTrackTintColor={Colors.GRAY}
                style={{ height: 1 }}
            />
        </View>
    );
}