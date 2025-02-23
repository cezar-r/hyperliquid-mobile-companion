import { View } from "react-native";
import { PositionHeader } from "./PositionHeader";
import { PositionContainer } from "./PositionContainer";
import { PositionClose } from "./PositionClose";

interface PositionViewProps {
    position: any;
    currentPrice: number;
    tpPrice: string,
    slPrice: string,
    onSharePositionPress: () => void;
    onTpSlModalPress: () => void;
}

export const PositionView: React.FC<PositionViewProps> = ({
    position,
    currentPrice,
    tpPrice,
    slPrice,
    onSharePositionPress,
    onTpSlModalPress,
}) => {
    return (
        <View>
            <PositionHeader
                onSharePositionPress={onSharePositionPress}
            />

            <PositionContainer
                position={position}
                currentPrice={currentPrice}
                tpPrice={tpPrice}
                slPrice={slPrice}
                onTpSlModalPress={onTpSlModalPress}
            />

            <PositionClose
                ticker={position.coin}
            />
        </View>
    );
}