// PasteButton.tsx
import React from "react"
import { GestureResponderEvent, TouchableOpacity } from "react-native"
import styles from "../../../styles/onboarding"
import { PasteButtonIcon } from "../../common/PasteButtonIcon"

interface PasteButtonProps {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export const PasteButton: React.FC<PasteButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.pasteButton}
            onPress={onPress}
        >
            <PasteButtonIcon />
        </TouchableOpacity>
    )
}