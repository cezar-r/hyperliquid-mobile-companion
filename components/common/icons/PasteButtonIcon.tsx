import { Octicons } from "@expo/vector-icons"
import { PasteButtonStyle } from "../../../styles/constants"

export const PasteButtonIcon = () => {
    return (
        <Octicons name="copy" size={PasteButtonStyle.size} color={PasteButtonStyle.color} />
    );
}
