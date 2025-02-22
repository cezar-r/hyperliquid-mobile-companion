import { Image } from "react-native";
import { GIF_LOGO } from "../../common/constants";


export interface GIFLogoProps {
    isLarge: boolean | undefined
}

export const GIFLogo: React.FC<GIFLogoProps> = (
    isLarge,
) => {
    const size = isLarge ? GIF_LOGO.size * 2 : GIF_LOGO.size;

    return (
        <Image 
            source={require(GIF_LOGO.source)}
            style={{ 
                width: size,
                height: size,
                resizeMode: 'contain'
            }}
        />
    )
}