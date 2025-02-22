import { Text } from "react-native"

import { LOGO_TEXT } from "../constants"
import styles from "../../../styles/onboarding"


export const Logo = () => {
    return (
        <Text style={styles.logoText}>
            {LOGO_TEXT}
        </Text>
    );
}