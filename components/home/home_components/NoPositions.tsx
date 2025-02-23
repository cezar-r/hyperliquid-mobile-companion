import { View, Text } from "react-native"

import styles from "../../../styles/home_page";
import { NO_OPEN_POSITIONS_TEXT } from "../constants";

export const NoPositions = () => {
    return (
        <View>
            <Text style={styles.noPositionText}>
               {NO_OPEN_POSITIONS_TEXT}
            </Text>
        </View>
    );
}