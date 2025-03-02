import { Ionicons, Octicons } from "@expo/vector-icons"

import { ShareButtonStyle } from "../../../styles/constants";

export const ShareButtonicon = () => {
    return (
        <Ionicons name="share-outline" size={ShareButtonStyle.size} color={ShareButtonStyle.color} />
    );
}
