import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { SHARE_POSITION_BUTTON_LABEL } from "./constants";

interface SharePositionButtonProps {
    onPress: () => void;
}

export const SharePositionButton: React.FC<SharePositionButtonProps> = ({
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <Text style={styles.buttonLabel}>{SHARE_POSITION_BUTTON_LABEL}</Text>
        </TouchableOpacity>
    );
}