import { Colors } from "./colors";

export const BORDER_RADIUS = 5;

export const BG_COLOR = Colors.DARK_DARK_GREEN;

export const PasteButtonIconCfg = {
    size: 18,
    color: Colors.BRIGHT_GREEN
}

export const TextCfg = {
    default: {
        fontSize: 15,
        boldWeight: 600,
        colors: {
            default: Colors.WHITE,
            highlight: Colors.BRIGHT_GREEN,
            caption: Colors.LIGHT_GRAY,
        }
    },
    title: {
        fontSize: 22,
        boldWeights: {
            thick: 700,
            medium: 600,
            thin: 500
        },
        color: Colors.WHITE
    }
}