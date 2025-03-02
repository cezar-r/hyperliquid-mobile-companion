import { Octicons } from "@expo/vector-icons"

import { CopyButtonStyle } from "../../../styles/constants";

export const CopyButtonIcon = () => {
    return (
        <Octicons name="copy" size={CopyButtonStyle.size} color={CopyButtonStyle.color} />
    );
}
