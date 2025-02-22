import { Octicons } from "@expo/vector-icons"
import { PasteButtonIconCfg } from "../../styles/constants"

export const PasteButtonIcon = () => {
    return (
        <Octicons name="copy" size={PasteButtonIconCfg.size} color={PasteButtonIconCfg.color} />
    );
}
